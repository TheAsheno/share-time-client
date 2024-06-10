function StackFx(el) {
	this.DOM = {};
	this.DOM.el = el;
	this.DOM.stack = this.DOM.el.querySelector('.stack');
	this.DOM.stackItems = [].slice.call(this.DOM.stack.children);
	this.totalItems = this.DOM.stackItems.length;
	this.DOM.img = this.DOM.stack.querySelector('.stack__figure > .stack__img');
	this.DOM.caption = this.DOM.el.querySelector('.grid__item-caption');
	this.DOM.title = this.DOM.caption.querySelector('.grid__item-title');
	this.DOM.columns = { left: this.DOM.caption.querySelector('.column--left'), right: this.DOM.caption.querySelector('.column--right') };
}

StackFx.prototype._removewindow = {};

StackFx.prototype._removewindow.animeTargets = function () {
	window.anime.remove(this.DOM.stackItems);
	window.anime.remove(this.DOM.img);
	window.anime.remove(this.DOM.title);
	window.anime.remove(this.DOM.columns.left);
	window.anime.remove(this.DOM.columns.right);
};

function HamalFx(el) {
	StackFx.call(this, el);
	this._initEvents();
}

HamalFx.prototype = Object.create(StackFx.prototype);
HamalFx.prototype.constructor = HamalFx;

HamalFx.prototype._initEvents = function () {
	var self = this;
	this._mouseenterFn = function () {
		self._removewindow.animeTargets.call(self);
		self._in();
	};
	this._mouseleaveFn = function () {
		self._removewindow.animeTargets.call(self);
		self._out();
	};
	this.DOM.stack.addEventListener('mouseenter', this._mouseenterFn);
	this.DOM.stack.addEventListener('mouseleave', this._mouseleaveFn);
	const sendbutton = document.getElementById('sendMessage');
	sendbutton.addEventListener('mouseenter', this._mouseenterFn);
	sendbutton.addEventListener('mouseleave', this._mouseleaveFn);
};

HamalFx.prototype._in = function () {
	var self = this;
	this.DOM.stackItems.map(function (e, i) {
		e.style.opacity = i !== self.totalItems - 1 ? 0.2 * i + 0.2 : 1
	});
	window.anime({
		targets: this.DOM.stackItems,
		duration: 1000,
		easing: 'easeOutExpo',
		translateY: function (target, index) {
			return -1 * index * 5;
		},
		rotate: function (target, index, cnt) {
			if (index === cnt - 1) {
				return 0;
			}
			else {
				return index % 2 ? (cnt - index) * 1 : -1 * (cnt - index) * 1;
			}
		},
		scale: function (target, index, cnt) {
			if (index === cnt - 1) {
				return 1;
			}
			else {
				return 1.05;
			}
		},
		delay: function (target, index, cnt) {
			return (cnt - index - 1) * 30
		}
	});
	window.anime({
		targets: this.DOM.img,
		duration: 1000,
		easing: 'easeOutExpo',
		scale: 0.7
	});
	window.anime({
		targets: [this.DOM.columns.left, this.DOM.columns.right],
		duration: 1000,
		easing: 'easeOutExpo',
		translateX: function (target, index) {
			return index === 0 ? -30 : 30;
		}
	});
};

HamalFx.prototype._out = function () {
	var self = this;
	window.anime({
		targets: this.DOM.stackItems,
		duration: 500,
		easing: 'easeOutExpo',
		translateY: 0,
		rotate: 0,
		scale: 1,
		opacity: function (target, index, cnt) {
			return index !== cnt - 1 ? 0 : 1
		}
	});
	window.anime({
		targets: this.DOM.img,
		duration: 1000,
		easing: 'easeOutElastic',
		scale: 1
	});
	window.anime({
		targets: [this.DOM.columns.left, this.DOM.columns.right],
		duration: 500,
		easing: 'easeOutExpo',
		translateX: 0
	});
};

export default HamalFx;