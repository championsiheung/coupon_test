const coupons = [
  { img: "https://github.com/championsiheung/coupon_test/blob/main/test2.gif?raw=true" },
  { img: "" }, { img: "" }, { img: "" }, { img: "" },
  { img: "" }, { img: "" }, { img: "" }, { img: "" }, { img: "" },
];

const container = document.getElementById('coupons-container');

function createCouponBox(coupon, index) {
  if (!coupon.img) return null;

  const box = document.createElement('div');
  box.className = 'coupon-box';

  const img = document.createElement('img');
  img.className = 'coupon-img';
  img.src = coupon.img;
  img.alt = `쿠폰 이미지 ${index + 1}`;
  box.appendChild(img);

  box.addEventListener('contextmenu', e => e.preventDefault());
  box.addEventListener('touchstart', e => e.preventDefault());

  return box;
}

coupons.slice(0, 10).forEach((coupon, idx) => {
  const couponBox = createCouponBox(coupon, idx);
  if (couponBox) container.appendChild(couponBox);
});

// 안내 패널 토글
const toggleBtn = document.getElementById('info-toggle');
const infoPanel = document.getElementById('store-info');

toggleBtn.addEventListener('click', () => {
  const isOpen = infoPanel.style.right === '0px';
  if (isOpen) {
    infoPanel.style.right = '-740px';
    toggleBtn.style.right = '0';
    toggleBtn.textContent = '◀';
    toggleBtn.classList.remove('active');
  } else {
    infoPanel.style.right = '0';
    toggleBtn.style.right = '720px';
    toggleBtn.textContent = '▶';
    toggleBtn.classList.add('active');
  }
});

// 외부 클릭 시 닫기
document.addEventListener('click', (e) => {
  const isClickInsidePanel = infoPanel.contains(e.target);
  const isClickOnToggle = toggleBtn.contains(e.target);

  if (!isClickInsidePanel && !isClickOnToggle) {
    if (infoPanel.style.right === '0px') {
      infoPanel.style.right = '-740px';
      toggleBtn.style.right = '0';
      toggleBtn.textContent = '◀';
      toggleBtn.classList.remove('active');
    }
  }
});

// 모바일 터치 슬라이드 닫기
let startX = 0;
let isDragging = false;

infoPanel.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  isDragging = true;
});

infoPanel.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  let currentX = e.touches[0].clientX;
  let diffX = currentX - startX;

  if (diffX > 50) {
    infoPanel.style.right = '-720px';
    toggleBtn.style.right = '0';
    toggleBtn.textContent = '◀';
    toggleBtn.classList.remove('active');
    isDragging = false;
  }
});

infoPanel.addEventListener('touchend', () => {
  isDragging = false;
});

// 기존 코드 아래에 추가하세요

// 🔒 F12, Ctrl+Shift+I, Ctrl+U 등 차단
document.addEventListener('keydown', function (e) {
  if (
    e.key === 'F12' ||
    (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
    (e.ctrlKey && e.key === 'U')
  ) {
    e.preventDefault();
    alert('접근이 제한되어 있습니다.');
  }
});

// 🔒 우클릭 막기
document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
  alert('우클릭이 제한되어 있습니다.');
});

