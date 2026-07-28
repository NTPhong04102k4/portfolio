/* ========================================================
   TEMPLATE — Contact Section
   ======================================================== */
import { CONTACT_INFO, FORM_ACTION } from '../constants.js';

/**
 * Render the contact section with info card and form.
 * @returns {string} HTML string
 */
export function renderContact() {
  const infoItems = CONTACT_INFO.map((item) => {
    const valueHtml = item.href
      ? `<a href="${item.href}"${item.target ? ` target="${item.target}" rel="noopener"` : ''}>${item.value}</a>`
      : `<p>${item.value}</p>`;

    return `
            <div class="contact__info-item">
              <div class="contact__info-icon"><i class="${item.icon}"></i></div>
              <div>
                <h4>${item.title}</h4>
                ${valueHtml}
              </div>
            </div>`;
  }).join('\n');

  return `
  <section id="contact" class="section contact">
    <div class="container">
      <h2 class="section__title reveal-up">
        <span class="section__number">05.</span> Liên hệ
      </h2>
      <p class="contact__subtitle reveal-up">
        Bạn có dự án hay cơ hội hợp tác? Hãy liên hệ với mình nhé!
      </p>
      <div class="contact__grid">
        <div class="contact__info reveal-left">
          <div class="glass-card contact__info-card">
            ${infoItems}
          </div>
        </div>
        <form id="contact-form" class="contact__form reveal-right" action="${FORM_ACTION}" method="POST">
          <div class="glass-card contact__form-card">
            <div class="form-group">
              <input type="text" id="form-name" name="name" required placeholder=" " />
              <label for="form-name">Họ tên</label>
              <span class="form-group__line"></span>
            </div>
            <div class="form-group">
              <input type="email" id="form-email" name="email" required placeholder=" " />
              <label for="form-email">Email</label>
              <span class="form-group__line"></span>
            </div>
            <div class="form-group">
              <input type="text" id="form-subject" name="subject" required placeholder=" " />
              <label for="form-subject">Tiêu đề</label>
              <span class="form-group__line"></span>
            </div>
            <div class="form-group">
              <textarea id="form-message" name="message" rows="5" required placeholder=" "></textarea>
              <label for="form-message">Nội dung</label>
              <span class="form-group__line"></span>
            </div>
            <button type="submit" class="btn btn--primary contact__submit">
              <i class="fas fa-paper-plane"></i> Gửi tin nhắn
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>`;
}
