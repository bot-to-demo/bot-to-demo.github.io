window.onload = function () {
	// Header scroll
	(function () {
		window.oldScrollY = window.scrollY;
		document.onscroll = (event) => {
			let res = window.oldScrollY > window.scrollY ? 1 : 2;
			window.oldScrollY = window.scrollY;

			let head = document.querySelector('header');

			if (res == 2 && window.scrollY > 920) {
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
			searchIcon.classList.toggle('_icon-search');
			searchIcon.classList.toggle('_icon-cancel');
			searchWrap.classList.toggle('show');
		}

		searchInput.addEventListener('input', function (e) {
			let searchLength = searchInput.value.length;

			if (searchLength >= 3) {
				getSearchRes();
			}
		});

		document.onclick = function (e) {
			let target = e.target;
			let itsSearch = target == searchWrap || searchWrap.contains(target);
			let itsBtn = target == searchIcon;
			let isActive = searchWrap.classList.contains('show');

			if (!itsSearch && !itsBtn && isActive) {
				toggle();
			}
		};

		searchIcon.addEventListener('click', (e) => {
			e.stopPropagation();
			toggle();
			searchInput.focus();
		});
	})();
	//SWIPER  Sale
	(function () {
		const swiper = new Swiper('#sale__swiper', {
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			pagination: {
				el: '.swiper-pagination',
			},
		});
	})();
};
