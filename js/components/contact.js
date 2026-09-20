/* ========================================================
   COMPONENT — Contact Form (Material 3 outlined fields)
   ======================================================== */
import { $, $$ } from '../utils.js';
import { validateEmail } from '../utils.js';
import { SELECTORS, EMAIL_REGEX, FORM_MESSAGES, CONTACT_EMAIL } from '../constants.js';

const ERROR_CLASS = 'form-group--error';

/**
 * Return the validation message for a field, or '' if valid.
 * @param {HTMLInputElement|HTMLTextAreaElement} field
 * @returns {string}
 */
function getError(field) {
  const value = field.value.trim();
  if (!value) return FORM_MESSAGES.required;
  if (field.type === 'email' && !validateEmail(value, EMAIL_REGEX)) return FORM_MESSAGES.invalidEmail;
  return '';
}

/**
 * Show / clear the M3 error state (outline + label colour + supporting text).
 * @param {HTMLInputElement|HTMLTextAreaElement} field
 * @param {string} message  empty string clears the error
 */
function setError(field, message) {
  const group = field.closest('.form-group');
  const hint = group?.querySelector('.form-group__hint');
  group?.classList.toggle(ERROR_CLASS, Boolean(message));
  field.setAttribute('aria-invalid', message ? 'true' : 'false');
  if (hint) hint.textContent = message;
}

/**
 * Initialise contact form validation and mailto fallback.
 */
export function initContactForm() {
  const form = $(SELECTORS.contactForm);
  if (!form) return;

  const fields = $$('input, textarea', form);

  fields.forEach((field) => {
    // M3: surface errors on blur, clear them as soon as the user fixes the value
    field.addEventListener('blur', () => setError(field, getError(field)));
    field.addEventListener('input', () => {
      if (field.closest('.form-group')?.classList.contains(ERROR_CLASS)) {
        setError(field, getError(field));
      }
    });
  });

  form.addEventListener('submit', (e) => {
    const invalid = fields.filter((field) => {
      const message = getError(field);
      setError(field, message);
      return Boolean(message);
    });

    if (invalid.length) {
      e.preventDefault();
      invalid[0].focus();
      return;
    }

    // If no formspree configured, use mailto fallback
    if (form.action.includes('your-form-id')) {
      e.preventDefault();
      const name = $(SELECTORS.formName).value.trim();
      const email = $(SELECTORS.formEmail).value.trim();
      const subject = $(SELECTORS.formSubject).value.trim();
      const message = $(SELECTORS.formMessage).value.trim();
      const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Từ: ${name}\nEmail: ${email}\n\n${message}`)}`;
      window.location.href = mailtoLink;
    }
  });
}
