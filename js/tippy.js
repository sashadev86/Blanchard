tippy('.tippy-tooltip', {
  content(reference) {
    const id = reference.getAttribute('data-template');
    const template = document.getElementById(id);
    return template.innerHTML;
  },
  allowHTML: true,
  arrow: true,
  delay: [100, 800],
  interactive: true,
  animation: 'rotate',
  theme: 'violet',
});

