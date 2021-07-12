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
			try {
				let data = {
					filter_name: searchInput.value,
				};

				$.ajax({
					url: `${window.location.href}index.php?route=common/search/autocomplete/`,
					type: 'get',
					data: data,
					dataType: 'json',
					success: function (data) {
						console.log(data);

						data.map((i) => {
							document
								.querySelector('.search__results-container')
								.insertAdjacentHTML(
									'beforeend',
									`<a href="${i.href}">${i.name}</a>`
								);
						});
					},
					error: function (xhr, ajaxOptions, thrownError) {
						throw new Error(response.status);
					},
				});

				// const res = await fetch('/...', {
				// 	method: 'POST',
				// 	headers: {
				// 		'Content-Type': 'text/plain;charset=UTF-8',
				// 	},
				// 	body: searchInput.value,
				// });

				// if (res.status == 200) {
				// 	const data = await res.json();
				// 	console.log(data);

				// 	data.map((i) => {
				// 		document
				// 			.querySelector('.search__results-container')
				// 			.insertAdjacentHTML(
				// 				'beforeend',
				// 				`<a href="${i.href}">${i.title}</a>`
				// 			);
				// 	});
				// } else {
				// 	throw new Error(response.status);
				// }
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

		if (nuotSection) {
			nuotSection.addEventListener('click', (e) => {
				//e.stopPropagation();
				let target = e.target.parentNode;

				if (!target.classList.contains('button-link')) {
					window.location.href = 'www.yourtube.com';
				}
			});
		}
	})();
	//SWIPER
	(function () {
		//*new collection
		let newСollection = document.querySelector('.new-collection-slider');
		if (newСollection) {
			// window.addEventListener('resize', function () {
			// 	if (window.matchMedia('(max-width: 520px)').matches) {
			// 		swiperInit();
			// 	}
			// });

			if (window.matchMedia('(max-width: 520px)').matches) {
				swiperInit();
			}

			function swiperInit() {
				const newCollectionSwiper = new Swiper(
					'.new-collection-slider',
					{
						pagination: {
							el: '.new-collection-pagination',
						},
						// autoplay: {
						// 	delay: 5000,
						// },
						watchOverflow: true,
						breakpoints: {
							521: {
								slidesPerView: 3,
							},
						},
					}
				);
			}
		}
		//*sale
		let sale = document.querySelector('.sale__swiper');
		if (sale) {
			const saleSwiper = new Swiper('.sale__swiper', {
				watchOverflow: true,
				pagination: {
					el: '.sale-swiper-pagination',
					type: 'bullets',
				},
				// autoplay: {
				// 	delay: 5000,
				// },
				breakpoints: {
					769: {
						navigation: {
							nextEl: '.sale-swiper-next',
							prevEl: '.sale-swiper-prev',
						},
						pagination: {
							el: '.sale-swiper-pagination',
							type: 'fraction',
						},
						scrollbar: {
							el: '.sale-swiper-scrollbar',
							draggable: true,
						},
					},
				},
			});
		}
		//*blog
		let blog = document.querySelector('.blog__swiper');
		if (blog) {
			const blogSwiper = new Swiper('.blog__swiper', {
				watchOverflow: true,
				slidesPerView: 1,
				spaceBetween: 10,
				pagination: {
					el: '.blog-swiper-pagination',
					type: 'bullets',
				},
				breakpoints: {
					769: {
						spaceBetween: 20,
						navigation: {
							nextEl: '.blog-swiper-next',
							prevEl: '.blog-swiper-prev',
						},
						pagination: {
							el: '.blog-swiper-pagination',
							type: 'fraction',
						},
						scrollbar: {
							el: '.blog-swiper-scrollbar',
							draggable: true,
						},
						slidesPerView: 2,
					},
					641: {
						slidesPerView: 2,
					},
				},
			});
		}
		//new-block
		let newBlock = document.querySelector('.new-block__swiper');
		if (newBlock) {
			const newBlockSwiper = new Swiper('.new-block__swiper', {
				watchOverflow: true,
				slidesPerView: 2,
				spaceBetween: 6,
				pagination: {
					el: '.new-block-swiper-pagination',
					type: 'bullets',
				},
				breakpoints: {
					1440: {
						slidesPerView: 4,
					},
					1170: {
						slidesPerView: 3,
					},
					769: {
						spaceBetween: 6,
						slidesPerView: 2,
						navigation: {
							nextEl: '.new-block-swiper-next',
							prevEl: '.new-block-swiper-prev',
						},
						pagination: {
							el: '.new-block-swiper-pagination',
							type: 'fraction',
						},
						scrollbar: {
							el: '.new-block-swiper-scrollbar',
							draggable: true,
						},
					},
				},
			});
		}

		let productCard = document.querySelector('.product-card-swiper');
		if (productCard) {
			const productCardSwiper = new Swiper('.product-card-swiper', {
				watchOverflow: true,
				slidesPerView: 1,
				navigation: {
					nextEl: '.product-card-swiper-next',
					prevEl: '.product-card-swiper-prev',
				},
				breakpoints: {
					// 1440: {
					// 	slidesPerView: 5,
					// },
					// 1400: {
					// 	slidesPerView: 4,
					// },
					// 769: {
					// 	spaceBetween: 6,
					// 	slidesPerView: 4,
					// 	navigation: {
					// 		nextEl: '.new-block-swiper-next',
					// 		prevEl: '.new-block-swiper-prev',
					// 	},
					// 	pagination: {
					// 		el: '.new-block-swiper-pagination',
					// 		type: 'fraction',
					// 	},
					// 	scrollbar: {
					// 		el: '.new-block-swiper-scrollbar',
					// 		draggable: true,
					// 	},
					// },
				},
			});
		}
	})();

	//? auth
	(function () {
		let unknownUser = document.querySelector('.unknown-user');
		let authWrapper = document.querySelector('.auth__wrapper');
		let unknownMobile = document.querySelector(
			'.menu__mobile-unregistered'
		);
		let personalWrapper = document.querySelector('.personal__wrapper');
		let menuIcon = document.querySelector('.menu__icon');
		let menuModal = document.querySelector('.menu__mobile-modal');
		let bodyModal = document.querySelector('#menu__mobile-modal');

		if (unknownUser) {
			//form show
			unknownMobile.addEventListener('click', (e) => {
				if (getComputedStyle(authWrapper).display == 'none') {
					menuModal.classList.toggle('active-modal');
					bodyModal.classList.toggle('active-modal');
					personalWrapper.classList.toggle('show');
				} else {
					menuModal.classList.toggle('active-modal');
					bodyModal.classList.toggle('active-modal');
					authWrapper.classList.toggle('show');
				}
			});

			unknownUser.addEventListener('click', (e) => {
				if (getComputedStyle(authWrapper).display == 'none') {
					personalWrapper.classList.toggle('show');
				} else {
					authWrapper.classList.toggle('show');
				}
				//authWrapper.classList.toggle('show');
			});

			//!сделать универсальным
			document.addEventListener('click', function (e) {
				if (getComputedStyle(authWrapper).display == 'none') {
					let target = e.target;
					let itsContainer =
						target == personalWrapper ||
						personalWrapper.contains(target);
					let itsBtn = target == unknownUser;
					let isActive = personalWrapper.classList.contains('show');

					if (
						!itsContainer &&
						!itsBtn &&
						isActive &&
						!e.target.classList.contains(
							'menu__mobile-unregistered'
						)
					) {
						//e.stopPropagation();
						personalWrapper.classList.toggle('show');
					}
				} else {
					let target = e.target;
					let itsContainer =
						target == authWrapper || authWrapper.contains(target);
					let itsBtn = target == unknownUser;
					let isActive = authWrapper.classList.contains('show');

					if (
						!itsContainer &&
						!itsBtn &&
						isActive &&
						!e.target.classList.contains(
							'menu__mobile-unregistered'
						)
					) {
						//e.stopPropagation();
						authWrapper.classList.toggle('show');
					}
				}
			});

			//form submit
			let numberForm = document.getElementById('numberForm');
			let numberInput = numberForm.getElementsByTagName('input');
			let codeForm = document.getElementById('codeForm');
			let codeInput = codeForm.getElementsByTagName('input');
			//переименовать если id формы изменется
			//let personalDataForm = document.getElementById('personal-data');
			//переименовать если id input изменется
			let persTelephone = document.getElementById('telephone');
			let refreshBtn = document.querySelector('.refresh-form');
			let userPhone;
			let trueCode;

			let numberCont = document.querySelector('.number__container');
			let codeCont = document.querySelector('.code__container');
			let resTel = document.querySelector('.code__container-text');

			document
				.querySelector('.back-number')
				.addEventListener('click', (e) => {
					numberCont.style.display = 'block';
					codeCont.style.display = 'none';
					document.querySelector('.send-tel').disabled = false;
					resetCode();

					console.log(trueCode);
				});

			refreshBtn.addEventListener('click', (e) => {
				resetCode();
				setTimeout(() => sendNumber(userPhone), 400);

				console.log(trueCode);
			});

			async function resetCode() {
				try {
					$.ajax({
						url: `${window.location.href}index.php?route=account/login/turboSmsClearAttemps`,
						type: 'post',
						data: trueCode,
						dataType: 'json',
						success: function () {
							console.log('true');
						},
						error: function (xhr, ajaxOptions, thrownError) {
							throw new Error(xhr);
						},
					});
				} catch (err) {
					console.log(err);
				}
			}

			numberForm.addEventListener('submit', function (e) {
				e.preventDefault();

				let numberValue = numberInput[0].value;

				if (numberValue !== '') {
					userPhone = {
						phone: numberValue,
					};
					document.querySelector('.send-tel').disabled = true;
					sendNumber(userPhone);
				}
			});

			async function sendNumber(userPhone) {
				try {
					$.ajax({
						url: `${window.location.href}index.php?route=account/login/turboSmsGetCode`,
						type: 'post',
						data: userPhone,
						dataType: 'json',
						success: function (data) {
							console.log(data);

							if (data.send_sms === true) {
								numberCont.style.display = 'none';
								codeCont.style.display = 'block';
								resTel.textContent = `+${data.phone}`;
								trueCode = data.send_code;
								userPhone = data.phone;
							}
						},
						error: function (xhr, ajaxOptions, thrownError) {
							numberInput[0].classList.add('error-input');
							document.querySelector(
								'.send-tel'
							).disabled = false;
							throw new Error(xhr);
						},
					});
				} catch (err) {
					console.log(err);
				}
			}

			codeForm.addEventListener('submit', function (e) {
				e.preventDefault();
				let codeValue = codeInput[0].value;

				if (codeValue !== '') {
					let data = {
						sms_code: codeValue,
						opencart_code: trueCode,
						phone: userPhone,
					};
					sendCode(data);
				}
			});

			async function sendCode(data) {
				try {
					$.ajax({
						url: `${window.location.href}index.php?route=account/login/turboSmsCheckCode`,
						type: 'post',
						data: data,
						dataType: 'json',
						success: function (data) {
							console.log(data);
							if (
								data.code_matching === true &&
								data.is_auth === false
							) {
								authWrapper.style.display = 'none';
								personalWrapper.classList.toggle('show');
								document.getElementById('telephone').value =
									data.telephone;
								document.getElementById('code').value =
									data.code;
							} else if (
								data.code_matching === false &&
								data.try_count <= 5
							) {
								codeInput[0].classList.add('error-input');
								document.querySelector(
									'.code-error-block'
								).textContent = data.code_error;
							} else if (
								data.code_matching === false &&
								data.try_count > 5
							) {
								codeInput[0].classList.add('error-input');
								document.querySelector(
									'.code-error-block'
								).textContent = data.try_error;
								refreshBtn.style.display = 'block';
							} else if (data.is_auth === true) {
								let auth = {
									telephone: data.telephone,
									code: data.code,
								};
								authFun(auth);
							}
						},
						error: function (xhr, ajaxOptions, thrownError) {
							codeInput[0].classList.add('error-input');
							throw new Error(response.status);
						},
					});
				} catch (err) {
					console.log(err);
				}
			}

			async function authFun(data) {
				try {
					$.ajax({
						url: `${window.location.href}index.php?route=account/login/turboSmsLogin`,
						type: 'post',
						data: data,
						dataType: 'json',
						success: function () {
							console.log('ok');
						},
						error: function (xhr, ajaxOptions, thrownError) {
							throw new Error(response.status);
						},
					});
				} catch (err) {
					console.log(err);
				}
			}
		}

		//? mob menu

		if (menuIcon) {
			let femaleSub = document.querySelector('#female-mob-sub');
			let maleSub = document.querySelector('#male-mob-sub');
			let childSub = document.querySelector('#child-mob-sub');

			menuIcon.addEventListener('click', (e) => {
				//e.stopPropagation();
				//menuModal.classList.toggle('show-left');
				menuModal.classList.toggle('active-modal');
				bodyModal.classList.toggle('active-modal');
			});
			//!сделать универсальным
			document.addEventListener('click', function (e) {
				if (
					e.target.classList.contains('active-modal') ||
					e.target.classList.contains('menu__mobile-close')
				) {
					menuModal.classList.toggle('active-modal');
					bodyModal.classList.toggle('active-modal');
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

	(function () {})();
};
