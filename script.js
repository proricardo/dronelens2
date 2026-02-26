/*
  =========================
  DroneLENS Interaction JS
  =========================
  Objetivos:
  1) Controlar tema light/dark com persistência.
  2) Garantir carrossel contínuo duplicando slides automaticamente.
*/

(() => {
  // Recupera referências centrais da interface.
  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const icon = themeToggle?.querySelector(".theme-toggle-icon");
  const label = themeToggle?.querySelector(".theme-toggle-label");

  // Chave única no localStorage para lembrar preferência do usuário.
  const THEME_KEY = "dronelens-theme";

  /**
   * Atualiza atributos visuais/textuais do botão para refletir o tema atual.
   * @param {"light" | "dark"} theme
   */
  function syncThemeUI(theme) {
    const darkMode = theme === "dark";
    if (!icon || !label) return;
    icon.textContent = darkMode ? "☀️" : "🌙";
    label.textContent = darkMode ? "Light mode" : "Dark mode";
  }

  /**
   * Aplica tema e salva a escolha para próximas visitas.
   * @param {"light" | "dark"} theme
   */
  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
    syncThemeUI(theme);
  }

  // Inicialização de tema: respeita preferência salva, com fallback para light.
  const storedTheme = localStorage.getItem(THEME_KEY);
  const initialTheme = storedTheme === "dark" ? "dark" : "light";
  applyTheme(initialTheme);

  // Alternância simples sem dependências externas.
  themeToggle?.addEventListener("click", () => {
    const currentTheme = root.getAttribute("data-theme");
    applyTheme(currentTheme === "dark" ? "light" : "dark");
  });

  // Configuração do carrossel contínuo.
  const carousel = document.querySelector("[data-carousel]");
  const track = carousel?.querySelector(".carousel-track");

  if (track) {
    // Clona todos os itens uma única vez para evitar lacuna no loop CSS.
    const items = [...track.children];
    items.forEach((item) => {
      const clone = item.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);
    });
  }
})();
