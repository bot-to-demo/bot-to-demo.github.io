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
			//$('#telephoneInput').mask('+380(99) 999-9999');
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
				console.log(numberValue);

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
				autoplay: {
					delay: 3000,
				},
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
				spaceBetween: 6,
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
					let btnDataId = target.getAttribute('data-color');
					let parent = target.parentNode.parentNode.parentNode;
					let card = parent.querySelector('[data-json]');
					let dataJson = card.getAttribute('data-json');
					let dataArr = JSON.parse(dataJson);
					let colorsCont = target.parentNode;
					colorsCont
						.querySelector('.active-color')
						.classList.remove('active-color');
					target.classList.add('active-color');

					dataArr.forEach((i) => {
						if (i.colorID == btnDataId) {
							let buyCont = parent.querySelector(
								'.product__buy-container'
							);
							let sizesCont = buyCont.querySelector(
								'.product__sizes-container'
							);
							// let cardLink = parent.querySelector(
							// 	'.product__card-sub-wrapper'
							// );
							// cardLink.setAttribute('href', i.productLink);

							if (sizesCont) {
								while (sizesCont.firstChild) {
									sizesCont.removeChild(sizesCont.firstChild);
								}

								i.colorSize.forEach((i) => {
									sizesCont.insertAdjacentHTML(
										'beforeend',
										`
										<button class="product__sizes-item" type="button" ${i.isDisabled}>${i.size}</button>
									`
									);
								});
							}

							let imgCont = parent.querySelector(
								'.product__card-sub-wrapper'
							);
							while (imgCont.firstChild) {
								imgCont.removeChild(imgCont.firstChild);
							}

							i.colorSrc.forEach((i) => {
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
		//email response
		let newstler = document.querySelector('#newstler');
		let emailContainet = document.querySelector('.footer__sub-action');
		let successContainet = document.querySelector('.footer__sub-success');

		newstler.addEventListener('submit', function (e) {
			e.preventDefault();
			let inputs = newstler.getElementsByTagName('input');
			let data = {
				email: inputs[0].value,
			};

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
		});
	})();
};

// [
// 	{
// 		"colorID":"white",
// 		"productLink":"#",
// 		"colorSrc":[
// 			"./images/new-4.jpg",
// 			"./images/new-4.jpg",
// 			"./images/new-4.jpg",
// 			"./images/new-4.jpg"
// 		],
// 		"colorSize":[
// 			{
// 				"size":"xs",
// 				"isDisabled":"enabled"
// 			},
// 			{
// 				"size":"s",
// 				"isDisabled":"disabled"
// 			},
// 			{
// 				"size":"m",
// 				"isDisabled":"enabled"
// 			},
// 			{
// 				"size":"l",
// 				"isDisabled":"enabled"
// 			},
// 			{
// 				"size":"xl",
// 				"isDisabled":"disabled"
// 			}
// 		]
// 	},
// 	{
// 		"colorID":"darkturquoise",
// 		"productLink":"#",
// 		"colorSrc":[
// 			"./images/new-2.jpg",
// 			"./images/new-2.jpg",
// 		],
// 		"colorSize":[
// 			{
// 				"size":"xs",
// 				"isDisabled":"enabled"
// 			},
// 			{
// 				"size":"s",
// 				"isDisabled":"disabled"
// 			},
// 			{
// 				"size":"m",
// 				"isDisabled":"enabled"
// 			},
// 			{
// 				"size":"l",
// 				"isDisabled":"enabled"
// 			},
// 			{
// 				"size":"xl",
// 				"isDisabled":"disabled"
// 			}
// 		]
// 	},
// 	{
// 		"colorID":"aquamarine",
// 		"productLink":"#",
// 		"colorSrc":[
// 			"./images/new-3.jpg",
// 			"./images/new-3.jpg",
// 			"./images/new-3.jpg",
// 		],
// 		"colorSize":[
// 			{
// 				"size":"xs",
// 				"isDisabled":"enabled"
// 			},
// 			{
// 				"size":"s",
// 				"isDisabled":"disabled"
// 			},
// 			{
// 				"size":"m",
// 				"isDisabled":"enabled"
// 			},
// 			{
// 				"size":"l",
// 				"isDisabled":"enabled"
// 			},
// 			{
// 				"size":"xl",
// 				"isDisabled":"disabled"
// 			}
// 		]
// 	},
// ]

//Create a Pixi Application
// function loadImages(paths, whenLoaded) {
// 	const imgs = [];
// 	const imgO = [];
// 	paths.forEach(function (path) {
// 		const img = new Image();
// 		img.onload = function () {
// 			imgs.push(img);
// 			imgO.push({ path, img });
// 			if (imgs.length === paths.length) whenLoaded(imgO);
// 		};
// 		img.src = path;
// 	});
// }

// class Sketch {
// 	constructor() {
// 		this.app = new PIXI.Application({
// 			backgroundColor: 0x1099bb,
// 			resizeTo: window,
// 		});
// 		document.querySelector('.webgl').appendChild(this.app.view);
// 		this.margin = 50;
// 		this.scroll = 0;
// 		this.width = (window.innerWidth - 2 * this.margin) / 3;
// 		this.height = window.innerHeight * 0.8;
// 		//this.width = 1440;
// 		//this.height = window.innerHeight;
// 		this.container = new PIXI.Container();
// 		this.app.stage.addChild(this.container);
// 		this.images = [
// 			'./images/cat-1.jpg',
// 			'./images/cat-2.jpg',
// 			'./images/cat-3.jpg',
// 			'./images/cat-4.jpg',
// 			'./images/cat-5.jpg',
// 		];

// 		loadImages(this.images, (images) => {
// 			this.loadedImages = images;
// 			this.add();
// 			this.render();
// 			this.scrollEvent();
// 		});
// 	}

// 	scrollEvent() {
// 		document.addEventListener('mousewhell', (e) => {
// 			this.scroll = e.wheelDelta / 3;
// 		});
// 	}

// 	add() {
// 		this.thumbs = [];
// 		this.loadedImages.forEach((img, i) => {
// 			// console.log(img);
// 			let texture = PIXI.Texture.from(img.img);
// 			const sprite = new PIXI.Sprite(texture);
// 			let container = new PIXI.Container();
// 			let spriteContainer = new PIXI.Container();

// 			// sprite.width = 350;
// 			// sprite.height = 470;

// 			sprite.anchor.set(0.5);
// 			sprite.position.set(
// 				sprite.texture.orig.width / 2,
// 				sprite.texture.orig.height / 2
// 			);

// 			container.x = (this.margin + this.width) * i;
// 			container.y = this.height / 10;

// 			container.addChild(sprite);
// 			this.container.addChild(container);
// 			this.thumbs.push(container);
// 		});
// 	}

// 	render() {
// 		this.app.ticker.add(() => {
// 			this.app.renderer.render(this.container);

// 			this.scroll += (this.scroll - this.scrollTarget) * 0.1;
// 			this.thumbs.forEach((th) => {
// 				th.position.x += this.scroll;
// 			});
// 		});
// 	}
// }

// new Sketch();

$('.slider').slick({
	slidesToShow: 4,
	slidesToScroll: 1,
	autoplay: true,
	autoplaySpeed: 0,
	variableWidth: true,
	speed: 5500,
	easing: 'linear',
	cssEase: 'linear',
	arrows: true,
	swipe: false,
});
