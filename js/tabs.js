document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.tabs-btn').forEach(function(tabsBtn) {
    tabsBtn.addEventListener('click', function(event) {
      const path = event.currentTarget.dataset.path;

      document.querySelectorAll('.tab-content').forEach(function(tabContent) {
        tabContent.classList.remove('tab-content-active');
      });

      document.querySelectorAll('.accordion__painter-btn').forEach(function(btn) {
        btn.classList.remove('tabs-btn-active');
      });
        event.currentTarget.classList.add('tabs-btn-active');

      document.querySelector(`[data-target="${path}"]`).classList.add('tab-content-active');
    });
  });
});
