var clamp = function (x, min, max) {
    return x < min ? min : (x > max ? max : x);
}


var Q = Quintus()
.include("Sprites, Anim,Input, Touch ")
.setup({ width: 1200, height: 800 })
.controls();


Q.Sprite.extend("Player", {
    init: function (p) {
        this._super(p, {
            sprite: "player",
            sheet: "player",
            x: Q.el.width / 2,
            y: Q.el.height - 60,
            type: Q.SPRITE_FRIENDLY,
            speed: 10
        });
        this.add("animation");
        this.play("default");

    },
    step: function(dt) {
        if (Q.inputs['left'])
            this.p.x -= this.p.speed;
        if (Q.inputs['right'])
            this.p.x += this.p.speed;

        this.p.x = clamp(this.p.x, 0 + (this.p.w / 2), Q.el.width - (this.p.w / 2));

        }
});
Q.load(["../images/space.jpg", "../images/new.png", "../data/player.json"], function () {


    Q.compileSheets("../images/new.png", "../data/player.json")

    Q.animations("player",{default:{ frames:[0,1,2,3], rate: 1/4}})
    var background = new Q.Sprite({ asset: "../images/space.jpg", x: Q.el.width / 2, y: Q.el.height / 2, type: Q.SPRITE_NONE })
    var player = new Q.Player();
    Q.gameLoop(function (dt) {
        Q.clear();
        background.render(Q.ctx);
        player.update(dt);
        player.render(Q.ctx);
       
    })
});