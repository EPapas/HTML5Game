var Q = Quintus()
.include("Sprites")
.setup({ width: 800, height: 480 });


Q.load(["../images/gradient.jpg"], function () {

    var background = new Q.Sprite({ asset: "../images/gradient.jpg", x: Q.el.width / 2, y: Q.el.height / 2, type: Q.SPRITE_NONE })

    Q.gameLoop(function (dt) {
        Q.clear();
        background.render(Q.ctx);   
   
    })
});