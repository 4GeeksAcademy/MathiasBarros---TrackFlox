# Propuesta Arquitectónica de Backend para TrackFlox

## 1. Contexto y objetivo

TrackFlox opera sobre dos necesidades críticas del negocio:

1. Control de inventario en tiempo real automaticamente(ia) entre dos almacenes (Los Angeles y Zaragoza).
2. Servicios de Logística de envíos, devoluciones y asignación de transportistas con criterios de costo, prioridad y calidad de servicio.

La arquitectura propuesta debe permitir el crecimiento funcional por dominios, trazabilidad operativa y mantenimiento sencillo por parte del equipo de programación.

## 2. Patrón arquitectónico elegido y justificado

### Arquitectura en capas con organización por dominios (modular monolith)

Se propone un backend en FastAPI con separación en capas y módulos de dominio:

1. Capa de presentación: routers y contratos HTTP.
2. Capa de aplicación: casos de uso y servicios.
3. Capa de dominio: reglas de negocio puras.
4. Capa de infraestructura: persistencia, integraciones externas y configuración.

#### Justificación vinculada a TrackFlox

1. El proyecto ya modela entidades claras (Product, Shipment, Carrier, InventoryMovement), lo cual encaja naturalmente con módulos por dominio.
2. Las reglas de negocio (validaciones, scoring de transportistas, cálculo de costos) deben ser reutilizables y testeables sin depender del framework web.
3. El sistema necesita evolucionar por hitos (inventario, logística inversa, reportes y automatización), por lo que conviene una base modular antes de microservicios.
4. Un enfoque serverless puro no es prioritario en esta etapa porque el valor principal está en el diseño del dominio y la coherencia operativa, no en escalado extremo inicial.

Resultado: modular monolith primero; opción a extraer microservicios en fases futuras si un dominio crece de forma independiente.

## 3. Estructura graficada en carpetas y módulos backend

Ubicación sugerida dentro de este repositorio:

1. Crear el backend en services/trackflox-api.
2. Mantener tipos compartidos en packages/shared cuando aplique.

Estructura sugerida:

```text
services/
	trackflox-api/
		app/
			main.py
			api/
				router.py
				deps.py
				v1/
					inventory.py
					shipments.py
					carriers.py
					returns.py
					reports.py
					auth.py
			core/
				config.py
				security.py
				logging.py
				cors.py
			domain/
				inventory/
					entities.py
					schemas.py
					rules.py
					repository.py
				logistics/
					entities.py
					schemas.py
					rules.py
					repository.py
				returns/
					entities.py
					schemas.py
					rules.py
					repository.py
				reporting/
					entities.py
					schemas.py
					service.py
			application/
				inventory_service.py
				shipment_service.py
				carrier_service.py
				return_service.py
				report_service.py
			infrastructure/
				db/
					base.py
					session.py
					models/
				repositories/
					inventory_repo_sql.py
					shipment_repo_sql.py
					carrier_repo_sql.py
				clients/
					notifications_client.py
			tests/
				unit/
				integration/
		pyproject.toml
		README.md
```

### Criterio de separación

1. Separación por dominio: inventario, logística de envíos, devoluciones y reportes.
2. Separación por responsabilidad técnica: API, reglas, orquestación e infraestructura.
3. Reglas de negocio en domain para permitir pruebas unitarias sin FastAPI.
4. Repositorios como interfaces en domain y adaptadores concretos en infrastructure.

## 4. Organización de endpoints y routers en FastAPI

Agrupación por dominios funcionales, no por tipo de operación técnica.

### API versionada

Prefijo base: /api/v1

### Endpoints propuestos

1. /api/v1/inventory
2. /api/v1/shipments
3. /api/v1/carriers
4. /api/v1/returns
5. /api/v1/reports
6. /api/v1/auth

### Ejemplos de rutas por dominio

1. Inventory
2. GET /api/v1/inventory/products
3. POST /api/v1/inventory/products
4. PATCH /api/v1/inventory/products/{sku}
5. GET /api/v1/inventory/low-stock

1. Shipments
2. POST /api/v1/shipments
3. GET /api/v1/shipments/{shipment_id}
4. PATCH /api/v1/shipments/{shipment_id}/assign-carrier
5. PATCH /api/v1/shipments/{shipment_id}/status

1. Carriers
2. GET /api/v1/carriers
3. GET /api/v1/carriers/recommendations
4. GET /api/v1/carriers/top-used

1. Returns
2. POST /api/v1/returns
3. GET /api/v1/returns/{return_id}
4. PATCH /api/v1/returns/{return_id}/quality-check

1. Reports
2. GET /api/v1/reports/inventory-value
3. GET /api/v1/reports/shipment-distance
4. GET /api/v1/reports/weekly-operations

### Criterio de diseño de routers

1. Cada router delega en servicios de aplicación, no implementa lógica compleja de negocio.
2. Validaciones de contrato HTTP con Pydantic.
3. Dependencias comunes en api/deps.py (auth, sesión, tracing).
4. Router agregador en api/router.py para registrar todos los módulos.

## 5. Convenciones FastAPI y cómo influyen en esta propuesta

Prácticas estándar incorporadas:

1. app/main.py como punto de entrada.
2. Routers separados en app/api/v1.
3. Configuración centralizada con variables de entorno en app/core/config.py.
4. Modelos de entrada/salida diferenciados de entidades internas.
5. Inyección de dependencias con Depends para auth, db y servicios.
6. Carpeta tests con separación de unit e integration.

Influencia directa en decisiones:

1. Evita que el proyecto derive en un único archivo grande con rutas mezcladas.
2. Facilita onboarding de nuevos colaboradores por estructura predecible.
3. Mejora testabilidad de reglas de negocio del dominio logístico.
4. Permite evolucionar sin romper contratos públicos de API.

## 6. Frontend y backend como sistemas separados

TrackFlox ya incluye frontend y utilidades TypeScript; la recomendación es mantener separación lógica clara aunque compartan monorepo.

### Estrategia recomendada

1. Monorepo con carpetas separadas (frontend en TrackFlox, backend en services/trackflox-api).
2. Comunicación exclusivamente por API HTTP versionada.
3. Contratos compartidos con esquemas y tipos sincronizados cuando sea necesario.

### Consideraciones clave

1. Variables de entorno
2. Frontend: URL base de API por entorno.
3. Backend: claves, DSN de base de datos, CORS y banderas de feature.

1. CORS
2. Permitir únicamente orígenes explícitos de frontend por ambiente.
3. Bloquear comodines en producción.

1. Despliegue
2. Frontend y backend pueden desplegarse por separado con ciclos independientes.
3. Mantener versionado de API para evitar rupturas al desplegar frontend.

## 7. Riesgos y puntos de atención

1. Riesgo: Mezclar lógica de negocio dentro de routers.
Impacto: difícil mantenimiento, bajo reuso, tests frágiles.
Mitigación: reglas y cálculos en domain y application; routers delgados.

2. Riesgo: No versionar API ni contratos.
Impacto: regresiones en frontend y bloqueos en despliegues.
Mitigación: prefijo /api/v1, changelog de contratos y deprecación controlada.

3. Riesgo: Configuración insegura de CORS y variables de entorno.
Impacto: exposición de API o fallos entre ambientes.
Mitigación: lista blanca por entorno, validación de config al arrancar y secretos fuera del repositorio.

4. Riesgo: Falta de límites por dominio (inventario, envíos, devoluciones).
Impacto: acoplamiento fuerte y deuda técnica acelerada.
Mitigación: ownership por módulo, interfaces de repositorio y revisiones de arquitectura por sprint.

## 8. Plan de adopción incremental

1. Fase 1: bootstrap de FastAPI con health check, config y router v1.
2. Fase 2: módulo inventory con CRUD básico y alertas de low stock.
3. Fase 3: módulo shipments y selección de carrier con reglas de scoring/costo.
4. Fase 4: módulo returns y reportes operativos semanales.
5. Fase 5: endurecimiento de seguridad, observabilidad y pruebas de integración.

## 9. Conclusión

La opción más adecuada para TrackFlox es una arquitectura en capas organizada por dominios dentro de un modular monolith en FastAPI. Esta estrategia equilibra velocidad de implementación, orden técnico y capacidad de evolución hacia escenarios más complejos sin sacrificar mantenibilidad.
