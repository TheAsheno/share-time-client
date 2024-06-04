const imagesLoaded = require('imagesloaded')

function extend(a, b) {
	for (var key in b) {
		if (b.hasOwnProperty(key)) {
			a[key] = b[key];
		}
	}
	return a;
}
function areClipPathShapesSupported() {
	var base = 'clipPath',
		prefixes = ['webkit', 'moz', 'ms', 'o'],
		properties = [base],
		testElement = document.createElement('testelement'),
		attribute = 'polygon(50% 0%, 0% 100%, 100% 100%)';
	for (var i = 0, l = prefixes.length; i < l; i++) {
		var prefixedProperty = prefixes[i] + base.charAt(0).toUpperCase() + base.slice(1);
		properties.push(prefixedProperty);
	}
	for (var i = 0, l = properties.length; i < l; i++) {
		var property = properties[i];
		if (testElement.style[property] === '') {
			testElement.style[property] = attribute;
			if (testElement.style[property] !== '') {
				return true;
			}
		}
	}
	return false;
};
function getRandom(min, max) {
	return Math.random() * (max - min + 1) + min;
}
const isClipPathSupported = areClipPathShapesSupported();
function FragmentsFx(el, options) {
	this.el = el;
	this.options = extend({}, this.options);
	extend(this.options, options);
	var self = this;
	imagesLoaded(this.el, { background: true }, function () { self._init(); });
}
FragmentsFx.prototype.options = {
	fragments: 25,
	boundaries: { x1: 100, x2: 100, y1: 50, y2: 50 },
	area: 'random',
	randomIntervals: {
		top: { min: 0, max: 90 },
		left: { min: 0, max: 90 },
		dimension: {
			width: { min: 10, max: 60, fixedHeight: 1.1 },
			height: { min: 10, max: 60, fixedWidth: 1.1 }
		}
	},
	parallax: false,
	randomParallax: { min: 10, max: 150 }
};
FragmentsFx.prototype._init = function () {
	this.dimensions = { width: this.el.offsetWidth, height: this.el.offsetHeight };
	this.imgsrc = this.el.style.backgroundImage.replace('url(', '').replace(')', '').replace(/\"/gi, "");;
	this._layout();
};
FragmentsFx.prototype._layout = function () {
	this.fragments = [];
	for (var i = 0, len = this.options.fragments; i < len; ++i) {
		const fragment = this._createFragment(i);
		this.fragments.push(fragment);
	}
};
FragmentsFx.prototype._createFragment = function (pos) {
	var fragment = document.createElement('div');
	fragment.className = 'fragment';
	if (this.options.parallax) {
		fragment.setAttribute('data-parallax', getRandom(this.options.randomParallax.min, this.options.randomParallax.max));
	}
	var piece = document.createElement('div');
	piece.style.backgroundImage = 'url(' + this.imgsrc + ')';
	piece.className = 'fragment__piece';
	piece.style.backgroundImage = 'url(' + this.imgsrc + ')';
	this._positionFragment(pos, piece);
	fragment.appendChild(piece);
	this.el.appendChild(fragment);

	return fragment;
};

FragmentsFx.prototype._positionFragment = function (pos, piece) {
	const isRandom = this.options.area === 'random',
		data = this.options.area[pos],
		top = isRandom ? getRandom(this.options.randomIntervals.top.min, this.options.randomIntervals.top.max) : data.top,
		left = isRandom ? getRandom(this.options.randomIntervals.left.min, this.options.randomIntervals.left.max) : data.left;
	var width, height;
	if (isRandom) {
		if (!!Math.round(getRandom(0, 1))) {
			width = getRandom(this.options.randomIntervals.dimension.width.min, this.options.randomIntervals.dimension.width.max);
			height = getRandom(Math.max(this.options.randomIntervals.dimension.width.fixedHeight - 0.1, 0.1), this.options.randomIntervals.dimension.width.fixedHeight + 0.1);
		}
		else {
			height = getRandom(this.options.randomIntervals.dimension.width.min, this.options.randomIntervals.dimension.width.max);
			width = getRandom(Math.max(this.options.randomIntervals.dimension.height.fixedWidth - 0.1, 0.1), this.options.randomIntervals.dimension.height.fixedWidth + 0.1);
		}
	}
	else {
		width = data.width;
		height = data.height;
	}
	if (!isClipPathSupported) {
		const clipTop = top / 100 * this.dimensions.height,
			clipLeft = left / 100 * this.dimensions.width,
			clipRight = width / 100 * this.dimensions.width + clipLeft,
			clipBottom = height / 100 * this.dimensions.height + clipTop;

		piece.style.clip = 'rect(' + clipTop + 'px,' + clipRight + 'px,' + clipBottom + 'px,' + clipLeft + 'px)';
	}
	else {
		piece.style.WebkitClipPath = piece.style.clipPath = 'polygon(' + left + '% ' + top + '%, ' + (left + width) + '% ' + top + '%, ' + (left + width) + '% ' + (top + height) + '%, ' + left + '% ' + (top + height) + '%)';
	}
	const translation = {
		x: getRandom(-1 * left / 100 * this.dimensions.width - this.options.boundaries.x1, this.dimensions.width - left / 100 * this.dimensions.width + this.options.boundaries.x2 - width / 100 * this.dimensions.width),
		y: getRandom(-1 * top / 100 * this.dimensions.height - this.options.boundaries.y1, this.dimensions.height - top / 100 * this.dimensions.height + this.options.boundaries.y2 - height / 100 * this.dimensions.height)
	};
	piece.style.WebkitTransform = piece.style.transform = 'translate3d(' + translation.x + 'px,' + translation.y + 'px,0)';
};

export default FragmentsFx;
