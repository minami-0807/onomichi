// 1.ドロワーメニューの開閉

jQuery("#js-drawer-button").on("click", function (e) {
  //   // eはeventの略
  e.preventDefault();
  // //  ☝ブラウザが持っている標準の機能を無効化するために記述
  jQuery("#js-drawer-button").toggleClass("is-checked");
  jQuery("#js-drawer-content").slideToggle();
  //js-drawerをスライドトグルする
  jQuery("body").toggleClass("is-fixed");
  //ドロワーを開いてるときに後ろのページがスクロールできないようにする
});

// toggleClassはclassをつけ外しする意味


// 2.スムーススクロールとドロワーの連動

jQuery('a[href^="#"]').on("click", function (e) {
  const speed = 1000;
  const id = jQuery(this).attr("href");
  const target = jQuery("#" == id ? "html" : id);
  const position = jQuery(target).offset().top - 64;
  jQuery("html, body").animate(
    {
      scrollTop: position,
    },
    speed,
    "swing", // swing or linear
  );
});

// 2.ドロワーメニューが開いているときのみ閉じる処理を実行

jQuery('#js-drawer-content a[href^="#"]').on("click", function (e) {
  jQuery("#js-drawer-button").removeClass("is-checked");
  jQuery("#js-drawer-content").slideUp();
  jQuery("body").removeClass("is-fixed");
});
// ☝spではスムーススクロールの際ドロワーメニューを閉じる必要があるので上記のような
// 指定をする。

// 3.about-swiper

const aboutSwiper = new Swiper("#js-about__swiper", {
  spaceBetween: 10,
  width: 100,
  speed: 3000, // 速度（大きいほどゆっくり）
  loop: true, // ループモードを有効にする

  breakpoints: {
    768: {
      spaceBetween: 20,
      width: 200,
    },
  },

  autoplay: {
    delay: 0, // 止まらず動き続ける
    disableOnInteraction: false,
  },
  freeMode: {
    enabled: true,
    momentum: false, // 慣性スクロールを無効化
  },
  virtual: {
    enabled: true, // widthで画面幅を指定してるのでバグが起きないよう画像を2倍に複製。バーチャルスライドを有効にします。
    addSlidesAfter: 10, // 事前にレンダリングする枚数。スライドの枚数が入ります。
  },
});

//  4.modal

const modalOpenItems = document.querySelectorAll(".js-modal-open");
const modalCloseItems = document.querySelectorAll(".js-modal-close");

// 開く処理
modalOpenItems.forEach(function (modalOpenItem) {
  modalOpenItem.addEventListener("click", function (e) {
    e.preventDefault();

    // クリックされたボタンの data-modal-target に書かれたIDを取得
    const targetId = this.getAttribute("data-modal-target");

    // そのIdをもつモーダルをピンポイントで取得
    const prizesModal = document.querySelector(`#${targetId}`);

    if (prizesModal) {
      prizesModal.showModal();
    }
  });
});

// 閉じる処理
modalCloseItems.forEach(function (modalCloseItem) {
  modalCloseItem.addEventListener("click", function (e) {
    e.preventDefault();

    //closest() を使います！
    // クリックされた「閉じる」ボタンから見て、一番近い親の <dialog> を探す
    const prizesModal = this.closest(".prizes-modal");

    if (prizesModal) {
      prizesModal.close();
    }
  });
});

// 5.spots-swiper

const spotsSwiper = new Swiper("#js-spots__swiper", {
  // Optional parameters
  spaceBetween: 16,
  slidesPerView: "1.5", // スライドの幅をCSS（または指定値）に合わせる
  centeredSlides: true,
  loop: true, // ループモードを有効にする

  breakpoints: {
    600: {
      slidesPerView: "2.5",
    },

    900: {
      spaceBetween: 20,
      slidesPerView: "2.5",
      centeredSlides: false,
    },

    1200: {
      spaceBetween: 30,
      slidesPerView: "3.2",
      centeredSlides: false,
    },
  },

  // Navigation arrows
  navigation: {
    nextEl: "#js-spots-next",
    prevEl: "#js-spots-prev",
  },
});

// 6.qaアコーディオン

jQuery(".js-accordion").on("click", function (e) {
  e.preventDefault();

  if (jQuery(this).parent().hasClass("is-open")) {
    jQuery(this).parent().removeClass("is-open");
    jQuery(this).next().slideUp();
  } else {
    jQuery(this).parent().addClass("is-open");
    jQuery(this).next().slideDown();
  }
});
 


// 7.コンタクトフォーム バリデーション

const form = jQuery("#js-form");
const inputElements = form.find(".js-form-input");

form.on("submit", function (e) {
  e.preventDefault();

  inputElements.removeClass("is-error");
  const isValid = form[0].checkValidity();
  if (isValid) {
    alert("送信完了");
    form[0].reset();
  }
});

inputElements.on("invalid", function () {
  jQuery(this).addClass("is-error");
});

inputElements.on("input", function () {
  if (this.checkValidity()) {
    jQuery(this).removeClass("is-error");
  }
});


// 8.少しスクロールするとpagetopが現れる

const pageTop = document.querySelector("#js-pagetop");
window.addEventListener("scroll", function(){
if (300 < window.scrollY){
  pageTop.classList.add("is-show");
} else {
  pageTop.classList.remove("is-show")
}
});


// 9.ふわっと表示させる

const intersectionObserver = new IntersectionObserver(function(entries) {
entries.forEach(function (entry) {
if (entry.isIntersecting) {
  entry.target.classList.add("is-in-view");
} else {
  entry.target.classList.remove("is-in-view");
}
});
});

const inViewItems = document.querySelectorAll(".js-in-view");
inViewItems.forEach(function(inViewItem) {
  intersectionObserver.observe(inViewItem);
});
