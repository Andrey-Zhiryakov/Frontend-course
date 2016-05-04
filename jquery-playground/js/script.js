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
			'img': 'https://placeholdit.imgix.net/~text?txtsize=40&txt=900%C3%97160&w=900&h=160'
		})
		.set(tabs[1], {
			'content': '<h1>some content of tab Two</h1>',
			'date': '',
			'img': 'http://lorempixel.com/900/160/'
		})
		.set(tabs[2], {
			'content': '<p style="font-size: 42px;color: red;">What\'s up?</p>',
			'date': '',
			'img': 'https://placeholdit.imgix.net/~text?txtsize=40&txt=900%C3%97160&w=900&h=160'
		})
		.set(tabs[3], {
			'content': '<div style="width: 100px; height: 100px; background: lime; margin: 30px; padding: 15px;"><span>This is uniqe content!</span></div>',
			'date': '',
			'img': null
		});
	tabsContentSize += 4; //tabs count

	//event handlers

	// reset button event handler
	$('#reset-btn').on('click', (e) => {
		e.preventDefault();
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
				$('#image').val(data.img);
				$('.slider img').attr('src', data.img);

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
	$('#add-btn').on('click', function(e) {
		e.preventDefault();

		var tabsBarWidth = parseInt($('.tabs').css('width'), 10), //get width of 'ul'
			tabWidth = parseInt($('.tab').css('width'), 10), //get width of single tab
			tabsCount = $('.tab').length; // get tabs count

		if ((tabsCount + 1) * tabWidth - 16 * (tabsCount + 1) >= tabsBarWidth) { // if sum of length of all tabs + 1 is bigger than 'ul' width, we don't add one more
			asideAddMsg('danger', 'Max length has been reached!');
			return;
		}
		var item = $('.tab:first').clone(); //clone first tab
		if (!addItem(item)) { //try to add cloned tab
			return;
		}
		// tabOffset();

		var content = $('#html').val(), //get tab data from inputs
			date = $('#datepicker').val(),
			img = $('#image').val();

		item.removeClass('active'); //if cloned tab has 'active' class, we remove it
		tabsContentSize++; //increment tabs count
		tabsContent.set(item[0], { //set tab data to array
			'content': content,
			'date': date,
			'img': img
		});

		resetInputs(); //clear inputs

		asideAddMsg('success', 'Tab successfully added!');
	});

	//edit button event
	$('#edit-btn').on('click', (e) => {
		e.preventDefault();

		var item = $('.tab.active'); //get current tab
		if (!addItem(item)) { // try to add item with entered index
			return;
		}
		var data = tabsContent.get(item[0]); // change saved tab's data
		data.content = $('#html').val();
		data.date = $('#datepicker').val();
		data.img = $('#image').val();

		item[0].dispatchEvent(new Event("click", { //call 'click' event on edited tab
			bubbles: true
		}));
		// tabOffset();
		asideAddMsg('success', 'Tab successfully edited!');
	});

	// aside event handler
	$('a.collapse').on('click', function() {
		var isCollapsed = false;
		return function() {
			if (isCollapsed) { //if sidebar is collapsed
				$('aside').animate({ //we pull it to the right
					'left': '0'
				}, 300);
				$('main').animate({ // and set left margin to main block
					'margin-left': '500px'
				}, 300);
				$('a.collapse').html('&#8656;'); // set mirrored arrow
				isCollapsed = !isCollapsed; //set flag to false
			} else {
				$('aside').animate({ //else we pull sidebar to the left
					'left': '-455px'
				}, 300);
				$('main').animate({ //and remove margin of main block
					'margin-left': '45px'
				}, 300);
				$('a.collapse').html('&#8658;'); //and set default arrow
				isCollapsed = !isCollapsed;
			}
		};
	}());

	//left slider button handler
	$('a.left').on('click', function left(e) {
		$(this).addClass('disabled'); //disable left slider button
		moveLeft(); //call slide left function
	});

	//right slider button handler
	$('a.right').on('click', function right(e) {
		$(this).addClass('disabled'); //disable right slider button
		moveRight(); //call slide right functoin
	});

	//set default values for page

	$('#text').val(0); //set default value to index input
	$('#title').val($('.tab').first().text()); //set value as first tab title
	$('#html').val($('.container').html()); //set content of first tab
	$('.tab.active').get()[0].dispatchEvent(new Event("click", { //call 'click' event on default active tab
		bubbles: true
	}));

	//other functions

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
		$('#image').val('');
	}

	function addItem(item) {
		var isNotFilled = false; //flag for checking filling of inputs

		$('form input').each(function() {
			if ($(this).val() === '') { // if input isn't filled, set flag to true state
				isNotFilled = true;
				return false; //break the iteration
			}
			return true;
		});

		if ($('#html').val() === '') {
			isNotFilled = true;
		}

		if (isNotFilled) { //tell to user that he didn't fill all inputs
			asideAddMsg('danger', 'You should fill all text inputs!');
			return false;
		}

		var index = $('#text').val(),
			title = $('#title').val();

		if (index < 0 || index > tabsContentSize - 1) { // if index out of range, we append child to end of list
			item.appendTo('.tabs').text(title);
		} else {
			item.insertBefore($('.tab').get(index)).text(title); //else insert before item with received index
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


	function moveLeft() {
		var currTab = $('.tab.active'); //get current tab
		var index = currTab.index('.tab'); //get index of current tab
		if (index === 0) { //check tab's position
			index = tabsContentSize - 1; // if it is first tab, set index to last tab
		} else {
			index--; // else set index to previous tab
		}

		var nextTab = $('.tab').eq(index); //get next(previous) tab

		currTab.removeClass('active'); //remove active class from current tab

		$('.slider img').fadeToggle(150, 'swing', function() { //animate image change
			nextTab.addClass('active'); //set active class to the next tab
			nextTab[0].dispatchEvent(new Event('click', { //call click event
				bubbles: true
			}));
			$(this).fadeToggle(150, 'swing', () => { //enable left slider button
				$('a.left').removeClass('disabled');
			});
		});
	}

	function moveRight() { // this works similary to the 'moveLeft' fuction
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
	}
});
