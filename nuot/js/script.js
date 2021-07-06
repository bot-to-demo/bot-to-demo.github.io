window.onload = function () {
	// Header scroll
	(function () {
		window.oldScrollY = window.scrollY;
		document.onscroll = (event) => {
			let res = window.oldScrollY > window.scrollY ? 1 : 2;
			window.oldScrollY = window.scrollY;

			let head = document.querySelector('header');

			if (res == 2 && window.scrollY > 400) {
				//head.classList.add('little-had');
				head.style.transform = 'translateY(-100%)';
			} else if (res == 1) {
				head.style.transform = 'translateY(0)';
			}
		};
	})();
	//header search
	(function () {
		let searchIcon = document.querySelector('.header-search');
		let searchWrap = document.querySelector('.header__search-wrapper');
		let searchInput = document.querySelector('.search-input');
		let nuotSection = document.querySelector('.nuot__grid-wrapper');

		async function getSearchRes() {
			console.log(searchInput.value);

			try {
				const res = await fetch('/...', {
					method: 'POST',
					headers: {
						'Content-Type': 'text/plain;charset=UTF-8',
					},
					body: searchInput.value,
				});

				if (res.status == 200) {
					const data = await res.json();
					console.log(data);

					data.map((i) => {
						document
							.querySelector('.search__results-container')
							.insertAdjacentHTML(
								'beforeend',
								`<a href="${i.href}">${i.title}</a>`
							);
					});
				} else {
					throw new Error(response.status);
				}
			} catch (err) {
				console.log(err);
			}
		}

		function toggle() {
			//!переделать функцию для логина, для мобильного меню
			//searchIcon.style.transform = 'scale(0.5)';

			searchIcon.classList.toggle('_icon-search');
			searchIcon.classList.toggle('_icon-cancel');
			searchIcon.classList.toggle('rotate-anim');
			searchWrap.classList.toggle('show');
		}

		searchInput.addEventListener('input', function (e) {
			let searchLength = searchInput.value.length;

			if (searchLength >= 3) {
				getSearchRes();
			}
		});

		document.addEventListener('click', function (e) {
			let target = e.target;
			let itsSearch = target == searchWrap || searchWrap.contains(target);
			let itsBtn = target == searchIcon;
			let isActive = searchWrap.classList.contains('show');

			if (!itsSearch && !itsBtn && isActive) {
				toggle();
			}
		});

		// document.onclick = function (e) {
		// 	let target = e.target;
		// 	let itsSearch = target == searchWrap || searchWrap.contains(target);
		// 	let itsBtn = target == searchIcon;
		// 	let isActive = searchWrap.classList.contains('show');

		// 	if (!itsSearch && !itsBtn && isActive) {
		// 		toggle();
		// 	}
		// };

		searchIcon.addEventListener('click', (e) => {
			//e.stopPropagation();
			toggle();
			searchInput.focus();
		});

		nuotSection.addEventListener('click', (e) => {
			//e.stopPropagation();
			let target = e.target.parentNode;

			if (!target.classList.contains('button-link')) {
				window.location.href = 'www.yourtube.com';
			}
		});
	})();
	//SWIPER
	(function () {
		//*new collection
		window.addEventListener('resize', function () {
			if (window.matchMedia('(max-width: 600px)').matches) {
				console.log('9999');
			}
		});
		//*sale
		const swiper = new Swiper('#sale__swiper', {
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			pagination: {
				el: '.swiper-pagination',
			},
			scrollbar: {
				el: '.swiper-scrollbar',
				//draggable: true,
			},
			watchOverflow: true,
		});

		// let saleLength = document.querySelectorAll('.sale__slide');
		// console.log(saleLength);
	})();

	//? auth
	(function () {
		let unknownUser = document.querySelector('.unknown-user');
		let authWrapper = document.querySelector('.auth__wrapper');
		let unknownMobile = document.querySelector(
			'.menu__mobile-unregistered'
		);
		//? mob menu
		let menuIcon = document.querySelector('.menu__icon');
		let menuModal = document.querySelector('.menu__mobile-modal');

		//let menuModalBody = document.querySelector('#menu__mobile-modal');

		if (unknownUser) {
			unknownMobile.addEventListener('click', (e) => {
				//if (!e.target.classList.contains('auth__wrapper')) {
				//e.stopPropagation();
				menuModal.classList.toggle('active-modal');
				authWrapper.classList.toggle('show');
				console.log('6666');

				//}
			});

			unknownUser.addEventListener('click', (e) => {
				//if (!e.target.classList.contains('auth__wrapper')) {
				//e.stopPropagation();
				authWrapper.classList.toggle('show');
				//}
			});
			//!сделать универсальным
			document.addEventListener('click', function (e) {
				//console.log('22222');

				let target = e.target;
				let itsContainer =
					target == authWrapper || authWrapper.contains(target);
				let itsBtn = target == unknownUser;
				let isActive = authWrapper.classList.contains('show');

				if (
					!itsContainer &&
					!itsBtn &&
					isActive &&
					!e.target.classList.contains('menu__mobile-unregistered')
				) {
					//e.stopPropagation();
					authWrapper.classList.toggle('show');
				}
			});
		}

		//? mob menu

		if (menuIcon) {
			let femaleMob = document.querySelector('#female-mob');
			let maleMob = document.querySelector('#male-mob');
			let childMob = document.querySelector('#child-mob');

			let femaleSub = document.querySelector('#female-mob-sub');
			let maleSub = document.querySelector('#male-mob-sub');
			let childSub = document.querySelector('#child-mob-sub');

			let unregMob = document.querySelector('menu__mobile-unregistered');

			menuIcon.addEventListener('click', (e) => {
				//e.stopPropagation();
				//menuModal.classList.toggle('show-left');
				menuModal.classList.toggle('active-modal');
				//menuModalBody.classList.toggle('active-modal');
			});
			//!сделать универсальным
			document.addEventListener('click', function (e) {
				if (
					e.target.classList.contains('active-modal') ||
					e.target.classList.contains('menu__mobile-close')
				) {
					menuModal.classList.toggle('active-modal');
				}

				//console.log(e.target);

				if (
					e.target.classList.contains('female-js') ||
					e.target.parentNode.classList.contains('female-js')
				) {
					femaleSub.classList.toggle('show');
				}

				if (
					e.target.classList.contains('male-js') ||
					e.target.parentNode.classList.contains('male-js')
				) {
					maleSub.classList.toggle('show');
				}

				if (
					e.target.classList.contains('child-js') ||
					e.target.parentNode.classList.contains('child-js')
				) {
					childSub.classList.toggle('show');
				}

				if (e.target.classList.contains('menu__mob-sub-title')) {
					e.target.parentNode.classList.toggle('show');
				}
				//console.log(e.target);

				// let target = e.target;
				// let itsContainer = target == authWrapper || authWrapper.contains(target);
				// let itsBtn = target == unknownUser;
				// let isActive = authWrapper.classList.contains('show');
				// if (!itsContainer && !itsBtn && isActive) {
				// 	e.stopPropagation();
				// 	authWrapper.classList.toggle('show');
				// }
			});
		}
	})();

	//? mob menu
	(function () {})();
};
