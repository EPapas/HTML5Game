var Q = Quintus()
.include("Sprites")
.setup({ width: 800, height: 480 });

Q.Sprite.extend("Player", {
    init: function (p) {
        this._super(p, {
            asset: "../images/spacership.png",
            x: Q.el.width / 2,
            y: Q.el.height - 60,
            type: Q.SPRITE_FRIENDLY,
            speed: 10
        })
    }
})
Q.load(["../images/gradient.jpg", "../images/spacership.png", "../data/player.json"], function () {


    Q.compileSheets("../images/new.png, ../data/player.json")
    var background = new Q.Sprite({ asset: "../images/gradient.jpg", x: Q.el.width / 2, y: Q.el.height / 2, type: Q.SPRITE_NONE })
    var player = new Q.Player();
    Q.gameLoop(function (dt) {
        Q.clear();
        background.render(Q.ctx);   
        player.render(Q.ctx);
    })
});