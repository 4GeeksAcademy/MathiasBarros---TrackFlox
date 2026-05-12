const applyPasswordToggle = () => {
	const passwordField = document.getElementById("password");
	const togglePasswordBtn = document.getElementById("toggle-password");
	const togglePasswordIcon = document.getElementById("toggle-password-icon");
	if (!passwordField || !togglePasswordBtn) return;

	const isHidden = passwordField.type === "password";
	passwordField.type = isHidden ? "text" : "password";

	if (togglePasswordIcon) {
		togglePasswordIcon.textContent = isHidden ? "visibility_off" : "visibility";
	}

	togglePasswordBtn.setAttribute("aria-pressed", isHidden ? "true" : "false");
	togglePasswordBtn.setAttribute("aria-label", isHidden ? "Ocultar contraseña" : "Mostrar contraseña");
};

window.togglePasswordVisibility = applyPasswordToggle;

document.addEventListener("DOMContentLoaded", () => {
	const form = document.getElementById("application-form");
	if (!form) return;

	const statusBox = document.getElementById("form-status");
	const togglePasswordBtn = document.getElementById("toggle-password");
	const togglePasswordIcon = document.getElementById("toggle-password-icon");

	const fields = {
		fullName: document.getElementById("fullName"),
		email: document.getElementById("email"),
		password: document.getElementById("password"),
		area: document.getElementById("area"),
		country: document.getElementById("country"),
		city: document.getElementById("city"),
		availability: document.getElementById("availability"),
		notes: document.getElementById("notes"),
		accept: document.getElementById("accept")
	};

	const activeFields = Object.fromEntries(Object.entries(fields).filter(([, element]) => element));

	const errorNode = (name) => document.querySelector(`[data-error-for="${name}"]`);

	const setError = (name, message) => {
		const node = errorNode(name);
		if (node) node.textContent = message;
		const field = activeFields[name];
		if (field && field.tagName !== "INPUT" && field.tagName !== "SELECT" && field.tagName !== "TEXTAREA") return;
		if (!field) return;
		if (message) {
			field.classList.add("border-red-400", "ring-2", "ring-red-200");
		} else {
			field.classList.remove("border-red-400", "ring-2", "ring-red-200");
		}
	};

	const clearStatus = () => {
		statusBox.classList.add("hidden");
		statusBox.textContent = "";
	};

	const validators = {
		fullName: (value) => {
			if (!value.trim()) return "Ingresá tu nombre completo.";
			if (value.trim().length < 3) return "El nombre debe tener al menos 3 caracteres.";
			if (!/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s'-]+$/.test(value.trim())) return "Usá solo letras y espacios en el nombre.";
			return "";
		},
		email: (value) => {
			if (!value.trim()) return "Ingresá un email válido.";
			if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())) return "El formato del email no es correcto.";
			return "";
		},
		password: (value) => {
			if (!value) return "Ingresá una contraseña.";
			if (value.length < 8) return "La contraseña debe tener al menos 8 caracteres.";
			if (!/[A-Z]/.test(value)) return "Incluí al menos una letra mayúscula.";
			if (!/[a-z]/.test(value)) return "Incluí al menos una letra minúscula.";
			if (!/[0-9]/.test(value)) return "Incluí al menos un número.";
			return "";
		},
		area: (value) => (!value ? "Seleccioná un área de interés." : ""),
		country: (value) => (!value ? "Seleccioná un país de operación." : ""),
		city: (value) => {
			if (!value.trim()) return "Ingresá la ciudad de operación.";
			if (value.trim().length < 2) return "La ciudad debe tener al menos 2 caracteres.";
			return "";
		},
		availability: (value) => (!value ? "Seleccioná tu disponibilidad." : ""),
		notes: (value) => {
			if (!value.trim()) return "Escribí un resumen breve de experiencia.";
			if (value.trim().length < 20) return "El resumen debe tener al menos 20 caracteres.";
			return "";
		},
		accept: (_, checked) => (!checked ? "Debes aceptar la confirmación de datos." : "")
	};

	const validateField = (name) => {
		const field = activeFields[name];
		if (!field) return true;
		const value = field.type === "checkbox" ? field.checked : field.value;
		const message = name === "accept" ? validators[name]("", value) : validators[name](value);
		setError(name, message);
		return !message;
	};

	Object.keys(activeFields).forEach((name) => {
		const field = activeFields[name];
		const eventName = field.type === "checkbox" || field.tagName === "SELECT" ? "change" : "input";
		field.addEventListener(eventName, () => {
			validateField(name);
			clearStatus();
		});
	});

	form.addEventListener("submit", (event) => {
		event.preventDefault();
		clearStatus();

		const valid = Object.keys(activeFields).every((name) => validateField(name));

		if (!valid) {
			statusBox.classList.remove("hidden");
			statusBox.classList.remove("border-emerald-300", "bg-emerald-50", "text-emerald-800");
			statusBox.classList.add("border-red-300", "bg-red-50", "text-red-800");
			statusBox.textContent = "Revisá los campos marcados y corregí los datos antes de enviar.";
			return;
		}

		statusBox.classList.remove("hidden");
		statusBox.classList.remove("border-red-300", "bg-red-50", "text-red-800");
		statusBox.classList.add("border-emerald-300", "bg-emerald-50", "text-emerald-800");
		statusBox.textContent = "Aplicación enviada correctamente. Validación local completada.";

		form.reset();
		Object.keys(activeFields).forEach((name) => setError(name, ""));

		if (togglePasswordBtn && activeFields.password) {
			activeFields.password.type = "password";
			if (togglePasswordIcon) {
				togglePasswordIcon.textContent = "visibility";
			}
			togglePasswordBtn.setAttribute("aria-pressed", "false");
			togglePasswordBtn.setAttribute("aria-label", "Mostrar contraseña");
		}
	});
});
