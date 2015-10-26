var clamp = function (x, min, max) {
    return x < min ? min : (x > max ? max : x);
}


var Q = Quintus()
.include("Sprites, Anim,Input, Touch, Scenes")
.setup({ width: 1200, height: 750 })
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

Q.scene("mainLevel", function(stage) {
    Q.gravity = 0;
    stage.insert(new Q.Sprite({ asset: "../images/space.jpg", x: Q.el.width / 2, y: Q.el.height / 2, type: Q.SPRITE_NONE }));
    stage.insert(new Q.Player());

});
Q.load(["../images/space.jpg", "../images/new.png", "../data/player.json"], function () {


    Q.compileSheets("../images/new.png", "../data/player.json");
    Q.animations("player", { default: { frames: [0, 1, 2, 3], rate: 1 / 4 } });
    Q.stageScene("mainLevel");
});
