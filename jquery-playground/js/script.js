$(document).ready(function() {
	var tabsContent = new WeakMap(), //associative array that will be save all tabs data
		tabsContentSize = 0,
		tabs = $('.tab');

	$('#datepicker').datepicker({ //set date limitation
		minDate: new Date(Date.now())
	}).datepicker('setDate', new Date(Date.now())); //set current date by default

	$('#datestamp').text($('#datepicker').val()); //set date stamp under the content container

	tabsContent.set(tabs[0], { //set default tabs content
			'content': $('.container').html(),
			'date': '',
			'img': null
		})
		.set(tabs[1], {
			'content': 'some content of tab Two',
			'date': '',
			'img': null
		})
		.set(tabs[2], {
			'content': 'What\'s up?',
			'date': '',
			'img': null
		})
		.set(tabs[3], {
			'content': 'This is uniqe content!',
			'date': '',
			'img': null
		});
	tabsContentSize += 4; //tabs count

	$('#text').val(0); //set default value to index input
	$('#title').val($('.tab').first().text()); //set value as first tab title
	$('#html').val($('.container').html()); //set content of first tab

	window.s = function() { //just for debug
		return tabsContent;
	}

	function asideAddMsg(type, message) { //function for display alerts
		$.simplyToast(message, type, {
			appendTo: 'aside',
			offset: {
				'from': 'bottom'
			}
		});
	}

	function resetInputs() { //function for reset all inputs
		$('#text').val('');
		$('#title').val('');
		$('#html').val('');
		$('#datepicker').val('');
	}

	function addItem(item) {
		var isNotFilled = false;

		$('form input').each(function() {
			if ($(this).val() === '') {
				isNotFilled = true;
				return false;
			}
			return true;
		});

		if ($('#html').val() === '') {
			isNotFilled = true;
		}

		if (isNotFilled) {
			asideAddMsg('danger', 'You should fill all text inputs!');
			return false;
		}

		var index = $('#text').val(),
			title = $('#title').val();

		if (index < 0 || index > tabsContentSize - 1) {
			item.appendTo('.tabs').text(title);
		} else {
			item.insertBefore($('.tab').get(index)).text(title);
		}
		return true;
	}

	// function tabOffset() {
	// 	$('.tab').each(function(ind, el) {
	// 		var offset = -20 * ind;
	// 		el.style.left = offset.toString(10) + 'px';
	// 		return true;
	// 	});
	// }

	// reset button event handler
	$('#reset-btn').on('click', (e) => {
		resetInputs();
	});

	//tabs event handler
	$('.tabs').on('click', function(e) {
		$('.tab').each(function(ind, el) {
			$(this).removeClass('active'); //remove class active of all tabs

			if (el === e.target) { //if this is target tab
				$(this).addClass('active'); //we add active class, because this is active tab
				var data = tabsContent.get(e.target); //receive data of this tab

				$('.container').html(data.content); //set values to inputs
				$('#text').val(ind);
				$('#title').val($(this).text());
				$('#html').val(data.content);

				if (data.date) { //if date field exists, set it as value, otherwise set current date by default
					$('#datestamp').text(data.date);
					$('#datepicker').val(data.date);
				} else {
					$('#datepicker').datepicker('setDate', new Date(Date.now()));
					$('#datestamp').text($('#datepicker').val());
				}
			}
		});
	});

	//add button event handler
	$('#add-btn').on('click', function() {
		var tabsBarWidth = parseInt($('.tabs').css('width'), 10),
			tabWidth = parseInt($('.tab').css('width'), 10),
			tabsCount = $('.tab').length;

		if (tabsCount * tabWidth - (16 * (tabsCount - 5)) >= tabsBarWidth) {
			asideAddMsg('danger', 'Max length has been reached!');
			return;
		}
		var item = $('.tab:first').clone();
		if (!addItem(item)) {
			return;
		}
		// tabOffset();

		var content = $('#html').val(),
			date = $('#datepicker').val();

		item.removeClass('active');
		tabsContentSize++;
		tabsContent.set(item[0], {
			'content': content,
			'date': date,
			'img': null
		});

		resetInputs();

		asideAddMsg('success', 'Tab successfully added!');
	});

	//edit button event
	$('#edit-btn').on('click', (e) => {
		var item = $('.tab.active');
		if (!addItem(item)) {
			return;
		}
		var data = tabsContent.get(item[0]);
		data.content = $('#html').val();
		data.date = $('#datepicker').val();
		var event = new Event("click", {
			bubbles: true
		});
		item[0].dispatchEvent(event);
		// tabOffset();
		asideAddMsg('success', 'Tab successfully edited!');
	});

	// aside event handler
	$('a.collapse').on('click', function() {
		var isCollapsed = false;
		return function() {
			if (isCollapsed) {
				$('aside').animate({
					'left': '0'
				}, 300);
				$('main').animate({
					'margin-left': '500px'
				}, 300);
				$('a.collapse').html('&#8656;');
				isCollapsed = !isCollapsed;
			} else {
				$('aside').animate({
					'left': '-455px'
				}, 300);
				$('main').animate({
					'margin-left': '45px'
				}, 300);
				$('a.collapse').html('&#8658;');
				isCollapsed = !isCollapsed;
			}
		};
	}());


	function moveLeft() {
		var currTab = $('.tab.active');
		var index = currTab.index('.tab');
		if (index === 0) {
			index = tabsContentSize - 1;
		} else {
			index--;
		}

		var nextTab = $('.tab').eq(index);

		currTab.removeClass('active');

		$('.slider img').fadeToggle(150, 'swing', function() {
			nextTab.addClass('active');
			nextTab[0].dispatchEvent(new Event('click', {
				bubbles: true
			}));
			$(this).fadeToggle(150, 'swing', () => {
				$('a.left').removeClass('disabled');
			});
		});
	}

	function moveRight() {
		var currTab = $('.tab.active');
		var index = currTab.index('.tab');
		if (index === tabsContentSize - 1) {
			index = 0;
		} else {
			index++;
		}

		var nextTab = $('.tab').eq(index);

		currTab.removeClass('active');

		$('.slider img').fadeToggle(150, 'swing', function() {
			nextTab.addClass('active');
			nextTab[0].dispatchEvent(new Event('click', {
				bubbles: true
			}));
			$(this).fadeToggle(150, 'swing', () => {
				$('a.right').removeClass('disabled');
			});
		});
	};

	$('a.left').on('click', function left(e) {
		debugger;
		$(this).addClass('disabled');
		moveLeft();
	});

	$('a.right').on('click', function right(e) {
		$(this).addClass('disabled');
		moveRight();
	});
});
