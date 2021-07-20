window.onload = function () {
	// Header scroll
	(function () {
		window.oldScrollY = window.scrollY;
		document.onscroll = (event) => {
			let res = window.oldScrollY > window.scrollY ? 1 : 2;
			window.oldScrollY = window.scrollY;

			let head = document.querySelector('header');

			if (res == 2 && window.scrollY > 400) {
				head.style.transform = 'translateY(-100%)';
			} else if (res == 1) {
				head.style.transform = 'translateY(0)';
			}

			if (res == 2 && window.scrollY > 1500) {
				document.getElementById('topBtn').style.display = 'flex';
			} else {
				document.getElementById('topBtn').style.display = 'none';
			}
		};

		document.getElementById('topBtn').onclick = () => {
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			});
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
					url: `index.php?route=common/search/autocomplete/`,
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
						throw new Error(xhr);
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

		searchIcon.addEventListener('click', (e) => {
			toggle();
			searchInput.focus();
		});

		if (nuotSection) {
			nuotSection.addEventListener('click', (e) => {
				let target = e.target.parentNode;

				if (!target.classList.contains('button-link')) {
					window.location.href = 'www.yourtube.com';
				}
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
			//mask plagin
			$('#telephoneInput')
				.click(function () {
					$(this).setCursorPosition(5);
				})
				.mask('+380(99)9999999');
			$('#telephoneInput').mask('+380(99)9999999');
			//mask plagin fix center
			$.fn.setCursorPosition = function (pos) {
				if ($(this).get(0).setSelectionRange) {
					$(this).get(0).setSelectionRange(pos, pos);
				} else if ($(this).get(0).createTextRange) {
					var range = $(this).get(0).createTextRange();
					range.collapse(true);
					range.moveEnd('character', pos);
					range.moveStart('character', pos);
					range.select();
				}
			};
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
						authWrapper.classList.toggle('show');
					}
				}
			});

			//form submit
			let numberForm = document.getElementById('numberForm');
			let numberInput = numberForm.getElementsByTagName('input');
			let codeForm = document.getElementById('codeForm');
			let codeInput = codeForm.getElementsByTagName('input');
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
				});

			refreshBtn.addEventListener('click', (e) => {
				resetCode();
				setTimeout(() => sendNumber(userPhone), 400);
			});

			async function resetCode() {
				try {
					$.ajax({
						url: `index.php?route=account/login/turboSmsClearAttemps`,
						type: 'post',
						data: userPhone,
						dataType: 'json',
						success: function () {
							codeInput[0].value = '';
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

				if (
					numberValue !== '' &&
					!numberValue.includes('_') &&
					numberInput[1].value == ''
				) {
					let number = numberValue.replace('(', '').replace(')', '');
					userPhone = {
						phone: number,
					};
					document.querySelector('.send-tel').disabled = true;
					sendNumber(userPhone);
				}
			});

			async function sendNumber(userPhone) {
				try {
					$.ajax({
						url: `index.php?route=account/login/turboSmsGetCode`,
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
								//show refresh btn after 60 sec.
								setTimeout(
									() => (refreshBtn.style.display = 'block'),
									60000
								);
							}
						},
						error: function (xhr, ajaxOptions, thrownError) {
							numberInput[0].classList.add('error-input');
							setTimeout(
								() =>
									numberInput[0].classList.remove(
										'error-input'
									),
								5000
							);
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

				if (codeValue.length == 6 && codeInput[1].value == '') {
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
						url: `index.php?route=account/login/turboSmsCheckCode`,
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
								document.getElementById('codePerson').value =
									data.code;
							} else if (
								(data.code_matching === false &&
									data.try_count <= 5) ||
								(data.is_auth === true &&
									data.code_matching === false &&
									data.try_count <= 5)
							) {
								codeInput[0].classList.add('error-input');
								setTimeout(
									() =>
										codeInput[0].classList.remove(
											'error-input'
										),
									5000
								);
								document.querySelector(
									'.code-error-block'
								).textContent = data.code_error;
							} else if (
								(data.code_matching === false &&
									data.try_count > 5) ||
								(data.is_auth === true &&
									data.code_matching === false &&
									data.try_count > 5)
							) {
								codeInput[0].classList.add('error-input');
								setTimeout(
									() =>
										codeInput[0].classList.remove(
											'error-input'
										),
									5000
								);
								document.querySelector(
									'.code-error-block'
								).textContent = data.try_error;
								refreshBtn.style.display = 'block';
							} else if (
								data.is_auth === true &&
								data.code_matching === true
							) {
								document.getElementById('codeForm').submit();
							}
						},
						error: function (xhr, ajaxOptions, thrownError) {
							codeInput[0].classList.add('error-input');
							setTimeout(
								() =>
									codeInput[0].classList.remove(
										'error-input'
									),
								5000
							);
							throw new Error(xhr);
						},
					});
				} catch (err) {
					console.log(err);
				}
			}

			let personalForm = document.querySelector('#personal-data');
			personalForm.addEventListener('submit', function (e) {
				e.preventDefault();
				if (
					personalForm.querySelector('input[name="chekoutPersone"]')
						.value == ''
				) {
					personalForm.submit();
				}
			});
		}

		//? mob menu

		if (menuIcon) {
			let femaleSub = document.querySelector('#female-mob-sub');
			let maleSub = document.querySelector('#male-mob-sub');
			let childSub = document.querySelector('#child-mob-sub');

			menuIcon.addEventListener('click', (e) => {
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
			});
		}
	})();
	//SWIPER
	(function () {
		//*new collection
		let newСollection = document.querySelector('.new-collection-slider');
		if (newСollection) {
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
		//*new-block
		let newBlock = document.querySelector('.new-block__swiper');
		if (newBlock) {
			const newBlockSwiper = new Swiper('.new-block__swiper', {
				//
				// autoplay: {
				// 	delay: 3000,
				// },
				// coverflowEffect: {
				// 	rotate: 50,
				// 	stretch: 0,
				// 	depth: 100,
				// 	modifier: 1,
				// 	slideShadows: true,
				//   },
				//   effect: "coverflow",
				//   grabCursor: true,
				//   centeredSlides: true,
				//
				// paginationClickable: true,
				// autoplay : 1,
				// speed:3000,

				// loop : true,
				// //autoplay : 1000,
				// //slidesPerView : 'auto',

				watchOverflow: true,
				slidesPerView: 2,
				//spaceBetween: 6,
				spaceBetween: 0,
				pagination: {
					el: '.new-block-swiper-pagination',
					type: 'bullets',
				},
				breakpoints: {
					1440: {
						slidesPerView: 4,
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
					1170: {
						slidesPerView: 3,
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
	})();
	//all change
	(function () {
		//new block
		let newBlock = document.querySelector('.new-block__swiper');
		if (newBlock) {
			//fun for prevent def for a link size
			if (window.matchMedia('(min-width: 640px)').matches) {
				document
					.querySelectorAll('.product__buy-container')
					.forEach((i) => {
						i.addEventListener('click', (e) => {
							e.preventDefault();
						});
					});
			}
			//add to favorite
			let favorites = document.querySelectorAll('.favorit');
			favorites.forEach((i) => {
				i.addEventListener('click', (e) => {
					let target = e.target;
					if (target.classList.contains('_icon-favorites')) {
						target.classList.remove('_icon-favorites');
						target.classList.add('_icon-favorites-fill');
					} else if (
						target.classList.contains('_icon-favorites-fill')
					) {
						target.classList.remove('_icon-favorites-fill');
						target.classList.add('_icon-favorites');
					}
				});
			});
			//slider cards
			const productCardSwiper = new Swiper('.product-card-swiper', {
				watchOverflow: true,
				slidesPerView: 1,
				navigation: {
					nextEl: '.product-card-swiper-next',
					prevEl: '.product-card-swiper-prev',
				},
			});
			//change card slides
			let colorsBtn = document.querySelectorAll('button[data-color]');
			colorsBtn.forEach((i) => {
				i.addEventListener('click', (e) => {
					let target = e.target;
					let btnDataColor = target.getAttribute('data-color');
					let parent = target.parentNode.parentNode.parentNode;
					let card = parent.querySelector('[data-json]');
					let dataJson = card.getAttribute('data-json');
					let dataArr = JSON.parse(dataJson);

					console.log(dataArr);

					let colorsCont = target.parentNode;
					colorsCont
						.querySelector('.active-color')
						.classList.remove('active-color');
					target.classList.add('active-color');

					dataArr.forEach((i) => {
						if (i.product_id == btnDataColor) {
							let buyCont = parent.querySelector(
								'.product__buy-container'
							);
							buyCont.setAttribute('href', i.href);
							let sizesCont = buyCont.querySelector(
								'.product__sizes-container'
							);
							let cardLink = parent.querySelector(
								'.product__card-sub-wrapper'
							);
							cardLink.setAttribute('href', i.href);

							if (sizesCont) {
								while (sizesCont.firstChild) {
									sizesCont.removeChild(sizesCont.firstChild);
								}

								i.sizes.forEach((i) => {
									console.log(i);

									// sizesCont.insertAdjacentHTML(
									// 	'beforeend',
									// 	`
									// 	<button class="product__sizes-item" type="button" ${i.isDisabled}>${i.size}</button>
									// `
									// );
								});
							}

							let imgCont = parent.querySelector(
								'.product__card-sub-wrapper'
							);
							while (imgCont.firstChild) {
								imgCont.removeChild(imgCont.firstChild);
							}

							i.images.forEach((i) => {
								imgCont.insertAdjacentHTML(
									'afterbegin',
									`
										<div class="product__card-img-cont swiper-slide">
											<img class="slide-img" src="${i}">
										</div>
									`
								);
							});

							productCardSwiper.map((i) => {
								i.update();
							});
						}
					});
				});
			});
		}
		//email reqest
		let newstler = document.querySelector('#newstler');
		let emailContainet = document.querySelector('.footer__sub-action');
		let successContainet = document.querySelector('.footer__sub-success');

		newstler.addEventListener('submit', function (e) {
			e.preventDefault();
			let inputs = newstler.getElementsByTagName('input');
			let data = {
				email: inputs[0].value,
			};

			if (inputs[1].value == '') {
				$.ajax({
					url: `index.php?route=mail/newsletter/setToDatabase`,
					type: 'post',
					data: data,
					dataType: 'json',
					success: function (data) {
						console.log('ok');
						inputs[0].value = '';
						data = {};
						emailContainet.style.display = 'none';
						successContainet.style.display = 'block';
					},
					error: function (xhr, ajaxOptions, thrownError) {
						console.log(xhr);
					},
				});
			}
		});

		//btn-slider-span init on display
		let sliderSpan = document.querySelectorAll('.btn-slider-span');
		if (sliderSpan.length > 0) {
			sliderSpan.forEach((i) => {
				let prevBtn = i.parentNode.querySelector(
					'._icon-arrow-slider-1'
				);
				if (prevBtn.classList.contains('swiper-button-lock')) {
					i.style.display = 'none';
				}
			});
		}
	})();
	// //all change
	// (function () {
	// 	//new block
	// 	let newBlock = document.querySelector('.new-block__swiper');
	// 	if (newBlock) {
	// 		//fun for prevent def for a link size
	// 		if (window.matchMedia('(min-width: 640px)').matches) {
	// 			document
	// 				.querySelectorAll('.product__buy-container')
	// 				.forEach((i) => {
	// 					i.addEventListener('click', (e) => {
	// 						let longSize = i.classList.contains('long-size');
	// 						if (!longSize) {
	// 							e.preventDefault();
	// 						}
	// 					});
	// 				});
	// 		}
	// 		//add to favorite
	// 		let favorites = document.querySelectorAll('.favorit');
	// 		favorites.forEach((i) => {
	// 			i.addEventListener('click', (e) => {
	// 				let target = e.target;
	// 				if (target.classList.contains('_icon-favorites')) {
	// 					target.classList.remove('_icon-favorites');
	// 					target.classList.add('_icon-favorites-fill');
	// 				} else if (
	// 					target.classList.contains('_icon-favorites-fill')
	// 				) {
	// 					target.classList.remove('_icon-favorites-fill');
	// 					target.classList.add('_icon-favorites');
	// 				}
	// 			});
	// 		});
	// 		//slider cards
	// 		const productCardSwiper = new Swiper('.product-card-swiper', {
	// 			watchOverflow: true,
	// 			slidesPerView: 1,
	// 			navigation: {
	// 				nextEl: '.product-card-swiper-next',
	// 				prevEl: '.product-card-swiper-prev',
	// 			},
	// 		});
	// 		//change card slides
	// 		let colorsBtn = document.querySelectorAll('button[data-color]');
	// 		colorsBtn.forEach((i) => {
	// 			i.addEventListener('click', (e) => {
	// 				let target = e.target;
	// 				let btnDataColor = target.getAttribute('data-color');
	// 				let parent = target.parentNode.parentNode.parentNode;
	// 				let card = parent.querySelector('[data-json]');
	// 				let dataJson = card.getAttribute('data-json');
	// 				let dataArr = JSON.parse(dataJson);

	// 				console.log(dataArr);

	// 				let colorsCont = target.parentNode;
	// 				colorsCont
	// 					.querySelector('.active-color')
	// 					.classList.remove('active-color');
	// 				target.classList.add('active-color');

	// 				dataArr.forEach((i) => {
	// 					if (i.product_id == btnDataColor) {
	// 						let buyCont = parent.querySelector(
	// 							'.product__buy-container'
	// 						);
	// 						buyCont.setAttribute('href', i.href);
	// 						let sizesCont = buyCont.querySelector(
	// 							'.product__sizes-container'
	// 						);
	// 						let cardLink = parent.querySelector(
	// 							'.product__card-sub-wrapper'
	// 						);
	// 						cardLink.setAttribute('href', i.href);

	// 						if (sizesCont) {
	// 							while (sizesCont.firstChild) {
	// 								sizesCont.removeChild(sizesCont.firstChild);
	// 							}

	// 							i.sizes.forEach((i) => {
	// 								//console.log(i);
	// 								sizesCont.insertAdjacentHTML(
	// 									'beforeend',
	// 									`
	// 									<button class="product__sizes-item" type="button" data-stock-status="${i.stock_status_id}" ${i.isDisabled}>${i.size}</button>
	// 								`
	// 								);
	// 							});
	// 						}

	// 						let imgCont = parent.querySelector(
	// 							'.product__card-sub-wrapper'
	// 						);
	// 						while (imgCont.firstChild) {
	// 							imgCont.removeChild(imgCont.firstChild);
	// 						}

	// 						i.images.forEach((i) => {
	// 							imgCont.insertAdjacentHTML(
	// 								'afterbegin',
	// 								`
	// 									<div class="product__card-img-cont swiper-slide">
	// 										<img class="slide-img" src="${i}">
	// 									</div>
	// 								`
	// 							);
	// 						});

	// 						productCardSwiper.map((i) => {
	// 							i.update();
	// 						});
	// 					}
	// 				});
	// 			});
	// 		});
	// 	}
	// 	//email reqest
	// 	let newstler = document.querySelector('#newstler');
	// 	let emailContainet = document.querySelector('.footer__sub-action');
	// 	let successContainet = document.querySelector('.footer__sub-success');

	// 	newstler.addEventListener('submit', function (e) {
	// 		e.preventDefault();
	// 		let inputs = newstler.getElementsByTagName('input');
	// 		let data = {
	// 			email: inputs[0].value,
	// 		};

	// 		if (inputs[1].value == '') {
	// 			$.ajax({
	// 				url: `index.php?route=mail/newsletter/setToDatabase`,
	// 				type: 'post',
	// 				data: data,
	// 				dataType: 'json',
	// 				success: function (data) {
	// 					console.log('ok');
	// 					inputs[0].value = '';
	// 					data = {};
	// 					emailContainet.style.display = 'none';
	// 					successContainet.style.display = 'block';
	// 				},
	// 				error: function (xhr, ajaxOptions, thrownError) {
	// 					console.log(xhr);
	// 				},
	// 			});
	// 		}
	// 	});

	// 	//btn-slider-span init on display
	// 	let sliderSpan = document.querySelectorAll('.btn-slider-span');
	// 	if (sliderSpan.length > 0) {
	// 		sliderSpan.forEach((i) => {
	// 			let prevBtn = i.parentNode.querySelector(
	// 				'._icon-arrow-slider-1'
	// 			);
	// 			if (prevBtn.classList.contains('swiper-button-lock')) {
	// 				i.style.display = 'none';
	// 			}
	// 		});
	// 	}
	// })();
};

// let webgl = document.querySelector('.webgl');
// if (webgl) {
// 	//Create a Pixi Application
// 	function cover(target, container) {
// 		return calculate(target, container, true);
// 	}

// 	function contain(target, container) {
// 		return calculate(target, container, false);
// 	}

// 	function calculate(target, container, cover) {
// 		var containerW = container.width || container.w;
// 		var containerH = container.height || container.h;
// 		var targetW = target.width || target.w;
// 		var targetH = target.height || target.h;

// 		var rw = containerW / targetW;
// 		var rh = containerH / targetH;
// 		var r;

// 		if (cover) {
// 			r = rw > rh ? rw : rh;
// 		} else {
// 			r = rw < rh ? rw : rh;
// 		}

// 		return {
// 			left: (containerW - targetW * r) >> 1,
// 			top: (containerH - targetH * r) >> 1,
// 			width: targetW * r,
// 			height: targetH * r,
// 			scale: r,
// 		};
// 	}

// 	function loadImages(data, whenLoaded) {
// 		const imgs = [];
// 		const imgO = [];

// 		data.forEach(function (i) {
// 			const img = new Image();
// 			let path = i.dataImg;
// 			let link = i.link;
// 			img.onload = function () {
// 				imgs.push(img);
// 				imgO.push({ path, img, link });
// 				if (imgs.length === data.length) whenLoaded(imgO);
// 			};
// 			img.src = path;
// 		});
// 	}

// 	class Sketch {
// 		constructor() {
// 			this.app = new PIXI.Application({
// 				backgroundColor: 0xfffaf6,
// 				width: 1440,
// 				height: 388
// 				//resizeTo: window,
// 				//resolution: devicePixelRatio
// 			});
// 			document.querySelector('.webgl').appendChild(this.app.view);
// 			this.margin = 6;
// 			// this.scroll = -1;
// 			// this.scrollTarget = -3;
// 			this.scroll = 1;
// 			this.scrollTarget = 2;
// 			this.width = (window.innerWidth - 2 * this.margin) / 7;
// 			//this.height = window.innerHeight * 0.8;
// 			//this.height = window.innerHeight;
// 			//this.width = 1440;
// 			this.height = 388;
// 			this.container = new PIXI.Container();
// 			this.app.stage.addChild(this.container);
// 			this.images = [
// 				{
// 					dataImg: './images/cat-1.jpg',
// 					link: 'https://learn.javascript.ru/form-elements',
// 				},
// 				{
// 					dataImg: './images/cat-2.jpg',
// 					link: 'https://www.pixijs.com/',
// 				},
// 				{
// 					dataImg: './images/cat-3.jpg',
// 					link: 'https://learn.javascript.ru/form-elements',
// 				},
// 				{
// 					dataImg: './images/cat-4.jpg',
// 					link: 'https://learn.javascript.ru/form-elements',
// 				},
// 				{
// 					dataImg: './images/cat-5.jpg',
// 					link: 'https://learn.javascript.ru/form-elements',
// 				},
// 				{
// 					dataImg: './images/cat-6.jpg',
// 					link: 'https://learn.javascript.ru/form-elements',
// 				},
// 				{
// 					dataImg: './images/cat-7.jpg',
// 					link: 'https://learn.javascript.ru/form-elements',
// 				},
// 				{
// 					dataImg: './images/cat-8.jpg',
// 					link: 'https://learn.javascript.ru/form-elements',
// 				},
// 				{
// 					dataImg: './images/cat-9.jpg',
// 					link: 'https://learn.javascript.ru/form-elements',
// 				},
// 				{
// 					dataImg: './images/cat-10.jpg',
// 					link: 'https://learn.javascript.ru/form-elements',
// 				},
// 			];
// 			this.WHOLEWIDTH = this.images.length * (this.width + this.margin);
// 			// const canvas = document.querySelector('canvas');
// 			// canvas.width = this.width;
// 			// canvas.height = this.height;

// 			loadImages(this.images, (images) => {
// 				this.loadedImages = images;
// 				this.add();
// 				this.render();
// 				this.scrollEvent();
// 			});
// 		}

// 		scrollEvent() {
// 			document
// 				.querySelector('.webgl')
// 				.addEventListener('mousewheel', (e) => {
// 					this.scrollTarget = e.wheelDelta / 16;
// 				});
// 		}

// 		add() {
// 			let parent = {
// 				w: this.width,
// 				h: this.height,
// 			};
// 			this.thumbs = [];
// 			this.loadedImages.forEach((img, i) => {
// 				// console.log(img);
// 				let texture = PIXI.Texture.from(img.img);
// 				const sprite = new PIXI.Sprite(texture);
// 				let container = new PIXI.Container();
// 				let spriteContainer = new PIXI.Container();

// 				let mask = new PIXI.Sprite(PIXI.Texture.WHITE);
// 				mask.width = this.width;
// 				mask.height = this.height;

// 				sprite.mask = mask;

// 				// sprite.width = 350;
// 				// sprite.height = 470;
// 				// sprite.texture.orig.width = 350;
// 				// sprite.texture.orig.height = 470;
// 				// console.log(sprite.texture.orig);

// 				sprite.anchor.set(0.5);
// 				sprite.position.set(
// 					sprite.texture.orig.width / 2,
// 					sprite.texture.orig.height / 2
// 				);

// 				let image = {
// 					w: sprite.texture.orig.width,
// 					h: sprite.texture.orig.height,
// 				};

// 				let cover1 = cover(image, parent);
// 				//console.log(spriteContainer);
// 				//console.log(container);
// 				spriteContainer.position.set(cover1.left, cover.top);
// 				spriteContainer.scale.set(cover1.scale, cover.scale);

// 				container.x = (this.margin + this.width) * i;
// 				container.y = this.height / 35;

// 				spriteContainer.addChild(sprite);
// 				container.interactive = true;
// 				container.buttonMode = true;
// 				container.link = img.link;
// 				container.on('mouseover', this.mouseOn);
// 				container.on('mouseout', this.mouseOut);
// 				container.on('click', this.onClick);
// 				container.addChild(spriteContainer);
// 				container.addChild(mask);
// 				this.container.addChild(container);
// 				this.thumbs.push(container);
// 			});
// 		}

// 		onClick(e) {
// 			//console.log(e.target.link);
// 			window.location.assign(e.target.link);
// 		}

// 		mouseOn(e) {
// 			let el = e.target.children[0].children[0];

// 			gsap.to(el.scale, {
// 				duration: 1,
// 				x: 1.1,
// 				y: 1.1,
// 			});
// 			document.querySelector('body').style.overflowY = 'hidden';
// 			document.querySelector('header').style.paddingRight = '15px';
// 			document.querySelector('main').style.paddingRight = '15px';
// 		}

// 		mouseOut(e) {
// 			let el = e.currentTarget.children[0].children[0];

// 			gsap.to(el.scale, {
// 				duration: 1,
// 				x: 1,
// 				y: 1,
// 			});
// 			document.querySelector('body').style.overflowY = 'scroll';
// 			document.querySelector('header').style.paddingRight = '0px';
// 			document.querySelector('main').style.paddingRight = '0px';
// 		}

// 		calcPos(src, pos) {
// 			let temp =
// 				((src + pos + this.WHOLEWIDTH + this.width + this.margin) %
// 					this.WHOLEWIDTH) -
// 				this.width -
// 				this.margin;

// 			return temp;
// 		}

// 		render() {
// 			this.app.ticker.add(() => {
// 				this.app.renderer.render(this.container);

// 				this.scroll -= (this.scroll - this.scrollTarget) * 0.1;
// 				this.scroll *= 0.9;
// 				this.thumbs.forEach((th) => {
// 					th.position.x = this.calcPos(this.scroll, th.position.x);
// 				});
// 			});
// 		}
// 	}
// 	new Sketch();
// }
if (window.matchMedia('(max-width: 768px)').matches) {
	//UIkit.slider('.uk-subcat-slider').stopAutoplay();
	UIkit.slider('.uk-subcat-slider', {
		draggable: true,
		autoplay: false,
	});
} else
	[
		UIkit.slider('.uk-subcat-slider', {
			draggable: false,
			autoplay: true,
		}),
	];
