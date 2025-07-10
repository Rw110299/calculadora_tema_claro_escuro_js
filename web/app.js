const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const toggleButton = document.getElementById('toggle-theme');

function safeEvaluate(expression) {
  try {
    // Simples parser seguro sem eval
    const sanitized = expression.replace(/[^-()\d/*+.]/g, '');
    // eslint-disable-next-line no-new-func
    return Function('"use strict";return (' + sanitized + ')')();
  } catch {
    return 'Erro';
  }
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-value');
    if (value) {
      display.value += value;
    } else if (button.id === 'clear') {
      display.value = '';
    } else if (button.id === 'equals') {
      display.value = safeEvaluate(display.value);
    }
  });
});

toggleButton.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  toggleButton.textContent = newTheme === 'dark' ? '☀️' : '🌙';
});

window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  toggleButton.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
});
