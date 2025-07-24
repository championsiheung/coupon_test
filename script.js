const expireDateStr = "2025-07-24"; // 날짜
const expireTimeStr = "19:00:00";   // 시간

const coupons = [
  { img: "https://github.com/championsiheung/coupon_test/blob/main/test2.gif?raw=true" },
  { img: "https://github.com/championsiheung/coupon_test/blob/main/로고.png?raw=true" }  // 만료 이미지
];

// ✅ 유효 시간 계산 (로컬 시간 기준)
const [year, month, day] = expireDateStr.split("-").map(Number);
const [hour, minute, second] = expireTimeStr.split(":").map(Number);
const expireDate = new Date(year, month - 1, day, hour, minute, second);

const now = new Date();
const isExpired = now > expireDate;

const messageElement = document.getElementById("coupon-message");
if (isExpired) {
  messageElement.innerHTML = `현재 이 쿠폰은 사용만료가 되서 사용할 수 없는 쿠폰입니다.`;
}

const container = document.getElementById('coupons-container');
const imageIndex = isExpired ? 1 : 0;

function createCouponBox(coupon, index) {
  if (!coupon.img) return null;

  const box = document.createElement('div');
  box.className = 'coupon-box';

  const img = document.createElement('img');
  img.className = 'coupon-img';
  img.src = coupon.img;
  img.alt = `쿠폰 이미지 ${index + 1}`;
  img.draggable = false;

  box.addEventListener('contextmenu', e => e.preventDefault());
  box.addEventListener('touchstart', e => e.preventDefault());

  box.appendChild(img);
  return box;
}

const selectedCoupon = createCouponBox(coupons[imageIndex], imageIndex);
if (selectedCoupon) container.appendChild(selectedCoupon);


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

