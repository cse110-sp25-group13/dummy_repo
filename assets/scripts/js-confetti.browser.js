var JSConfetti = (function () {
  'use strict';
  function t(t, i) {
    if (!(t instanceof i))
      throw new TypeError('Cannot call a class as a function');
  }
  function i(t, i) {
    for (var e = 0; e < i.length; e++) {
      var o = i[e];
      (o.enumerable = o.enumerable || !1),
        (o.configurable = !0),
        'value' in o && (o.writable = !0),
        Object.defineProperty(t, o.key, o);
    }
  }
  function e(t, e, o) {
    return e && i(t.prototype, e), o && i(t, o), t;
  }
  function o(t) {
    return +t.replace(/px/, '');
  }
  function n(t, i) {
    var e = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
      o = Math.random() * (i - t) + t;
    return Math.floor(o * Math.pow(10, e)) / Math.pow(10, e);
  }
  function s(t) {
    return t[n(0, t.length)];
  }
  var a = [
    '#fcf403',
    '#62fc03',
    '#f4fc03',
    '#03e7fc',
    '#03fca5',
    '#a503fc',
    '#fc03ad',
    '#fc03c2',
  ];
  function r(t) {
    return Math.log(t) / Math.log(1920);
  }
  var h = (function () {
    function i(e) {
      t(this, i);
      var o = e.initialPosition,
        a = e.direction,
        h = e.confettiRadius,
        c = e.confettiColors,
        d = e.emojis,
        l = e.emojiSize,
        u = e.canvasWidth,
        f = n(0.9, 1.7, 3) * r(u);
      (this.confettiSpeed = { x: f, y: f }),
        (this.finalConfettiSpeedX = n(0.2, 0.6, 3)),
        (this.rotationSpeed = d.length ? 0.01 : n(0.03, 0.07, 3) * r(u)),
        (this.dragForceCoefficient = n(5e-4, 9e-4, 6)),
        (this.radius = { x: h, y: h }),
        (this.initialRadius = h),
        (this.rotationAngle = 'left' === a ? n(0, 0.2, 3) : n(-0.2, 0, 3)),
        (this.emojiSize = l),
        (this.emojiRotationAngle = n(0, 2 * Math.PI)),
        (this.radiusYUpdateDirection = 'down');
      var p =
        'left' === a
          ? (n(82, 15) * Math.PI) / 180
          : (n(-15, -82) * Math.PI) / 180;
      (this.absCos = Math.abs(Math.cos(p))),
        (this.absSin = Math.abs(Math.sin(p)));
      var m = n(-150, 0),
        v = {
          x: o.x + ('left' === a ? -m : m) * this.absCos,
          y: o.y - m * this.absSin,
        };
      (this.currentPosition = Object.assign({}, v)),
        (this.initialPosition = Object.assign({}, v)),
        (this.color = d.length ? null : s(c)),
        (this.emoji = d.length ? s(d) : null),
        (this.createdAt = new Date().getTime()),
        (this.direction = a);
    }
    return (
      e(i, [
        {
          key: 'draw',
          value: function (t) {
            var i = this.currentPosition,
              e = this.radius,
              o = this.color,
              n = this.emoji,
              s = this.rotationAngle,
              a = this.emojiRotationAngle,
              r = this.emojiSize,
              h = window.devicePixelRatio;
            o
              ? ((t.fillStyle = o),
                t.beginPath(),
                t.ellipse(
                  i.x * h,
                  i.y * h,
                  e.x * h,
                  e.y * h,
                  s,
                  0,
                  2 * Math.PI,
                ),
                t.fill())
              : n &&
                ((t.font = ''.concat(r, 'px serif')),
                t.save(),
                t.translate(h * i.x, h * i.y),
                t.rotate(a),
                (t.textAlign = 'center'),
                t.fillText(n, 0, 0),
                t.restore());
          },
        },
        {
          key: 'updatePosition',
          value: function (t, i) {
            var e = this.confettiSpeed,
              o = this.dragForceCoefficient,
              n = this.finalConfettiSpeedX,
              s = this.radiusYUpdateDirection,
              a = this.rotationSpeed,
              r = this.createdAt,
              h = this.direction,
              c = i - r;
            e.x > n && (this.confettiSpeed.x -= o * t),
              (this.currentPosition.x +=
                e.x * ('left' === h ? -this.absCos : this.absCos) * t),
              (this.currentPosition.y =
                this.initialPosition.y -
                e.y * this.absSin * c +
                (0.00125 * Math.pow(c, 2)) / 2),
              (this.rotationSpeed -= this.emoji ? 1e-4 : 1e-5 * t),
              this.rotationSpeed < 0 && (this.rotationSpeed = 0),
              this.emoji
                ? (this.emojiRotationAngle +=
                    (this.rotationSpeed * t) % (2 * Math.PI))
                : 'down' === s
                  ? ((this.radius.y -= t * a),
                    this.radius.y <= 0 &&
                      ((this.radius.y = 0),
                      (this.radiusYUpdateDirection = 'up')))
                  : ((this.radius.y += t * a),
                    this.radius.y >= this.initialRadius &&
                      ((this.radius.y = this.initialRadius),
                      (this.radiusYUpdateDirection = 'down')));
          },
        },
        {
          key: 'getIsVisibleOnCanvas',
          value: function (t) {
            return this.currentPosition.y < t + 100;
          },
        },
      ]),
      i
    );
  })();
  function c() {
    var t = document.createElement('canvas');
    return (
      (t.style.position = 'fixed'),
      (t.style.width = '100%'),
      (t.style.height = '100%'),
      (t.style.top = '0'),
      (t.style.left = '0'),
      (t.style.zIndex = '1000'),
      (t.style.pointerEvents = 'none'),
      document.body.appendChild(t),
      t
    );
  }
  function d(t) {
    var i = t.confettiRadius,
      e = void 0 === i ? 6 : i,
      o = t.confettiNumber,
      n = void 0 === o ? t.confettiesNumber || (t.emojis ? 40 : 250) : o,
      s = t.confettiColors,
      r = void 0 === s ? a : s,
      h = t.emojis,
      c = void 0 === h ? t.emojies || [] : h,
      d = t.emojiSize,
      l = void 0 === d ? 80 : d;
    return (
      t.emojies &&
        console.error(
          'emojies argument is deprecated, please use emojis instead',
        ),
      t.confettiesNumber &&
        console.error(
          'confettiesNumber argument is deprecated, please use confettiNumber instead',
        ),
      {
        confettiRadius: e,
        confettiNumber: n,
        confettiColors: r,
        emojis: c,
        emojiSize: l,
      }
    );
  }
  return (function () {
    function i() {
      var e =
        arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      t(this, i),
        (this.canvas = e.canvas || c()),
        (this.canvasContext = this.canvas.getContext('2d')),
        (this.shapes = []),
        (this.lastUpdated = new Date().getTime()),
        (this.iterationIndex = 0),
        (this.loop = this.loop.bind(this)),
        requestAnimationFrame(this.loop);
    }
    return (
      e(i, [
        {
          key: 'loop',
          value: function () {
            var t,
              i,
              e,
              n,
              s,
              a = this;
            (t = this.canvas),
              (i = window.devicePixelRatio),
              (e = getComputedStyle(t)),
              (n = o(e.getPropertyValue('width'))),
              (s = o(e.getPropertyValue('height'))),
              t.setAttribute('width', (n * i).toString()),
              t.setAttribute('height', (s * i).toString());
            var r = new Date().getTime(),
              h = r - this.lastUpdated,
              c = this.canvas.offsetHeight;
            this.shapes.forEach(function (t) {
              t.updatePosition(h, r), t.draw(a.canvasContext);
            }),
              this.iterationIndex % 100 == 0 &&
                (this.shapes = this.shapes.filter(function (t) {
                  return t.getIsVisibleOnCanvas(c);
                })),
              (this.lastUpdated = r),
              this.iterationIndex++,
              requestAnimationFrame(this.loop);
          },
        },
        {
          key: 'addConfetti',
          value: function () {
            for (
              var t =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : {},
                i = d(t),
                e = i.confettiRadius,
                o = i.confettiNumber,
                n = i.confettiColors,
                s = i.emojis,
                a = i.emojiSize,
                r = window.devicePixelRatio,
                c = this.canvas.width / r,
                l = this.canvas.height / r,
                u = (5 * l) / 7,
                f = { x: 0, y: u },
                p = { x: c, y: u },
                m = 0;
              m < o / 2;
              m++
            )
              this.shapes.push(
                new h({
                  initialPosition: f,
                  direction: 'right',
                  confettiRadius: e,
                  confettiColors: n,
                  confettiNumber: o,
                  emojis: s,
                  emojiSize: a,
                  canvasWidth: c,
                }),
              ),
                this.shapes.push(
                  new h({
                    initialPosition: p,
                    direction: 'left',
                    confettiRadius: e,
                    confettiColors: n,
                    confettiNumber: o,
                    emojis: s,
                    emojiSize: a,
                    canvasWidth: c,
                  }),
                );
          },
        },
      ]),
      i
    );
  })();
})();
