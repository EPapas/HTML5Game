var clamp = function(x, min, max) {
    return x < min ? min : (x > max ? max : x);
}


var Q = Quintus()
.include("Sprites, Anim, Input, Touch, Scenes")
.setup({ width: 1200, height: 750 })
.touch();

Q.input.touchControls({
    controls: [
        ['left', '<'],
        ['right', '>'],
        [],
        [],
        [],
        [],
        ['fire', 'a']

]
    
});

Q.controls();

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
        this.add("Gun");
    },
    step: function(dt) {
        if (Q.inputs['left'])
            this.p.x -= this.p.speed;
        if (Q.inputs['right'])
            this.p.x += this.p.speed;
      

        this.p.x = clamp(this.p.x, 0 + (this.p.w / 2), Q.el.width - (this.p.w / 2));
        

        }  
});

Q.Sprite.extend("Shot", {
    init: function (p) {
        this._super(p, {
            sprite: "shot",
            sheet: "shot",
            speed: 200
        });
        this.add("animation");
        this.play("default");
        
    },
    step: function (dt) {
        this.p.y -= this.p.speed * dt;

        if (this.p.y > Q.el.height || this.p.y < 0) {
            this.destroy();
        }
    }
});

Q.component("Gun", {
    added: function () {
        this.entity.p.shots = [];
        this.entity.on("step", "handleFiring")

    },

    extend: {

        handleFiring: function (dt) {
            var entity = this;

            for (var i = entity.p.shots.length - 1; i >= 0; i--) {
                if (entity.p.shots[i].isDestroyed) {
                    entity.p.shots.splice(i, 1);
                    
                }
            }

            if (Q.inputs['fire']) {
                entity.fire();
            }
        },

        fire: function(){
            if (Q.inputs['fire']) {
                var entity = this;
                var shot = Q.stage().insert(new Q.Shot({ x: entity.p.x, y: entity.p.y - 70, speed: 200, type: Q.SPRITE_DEFAULT | Q.SPRITE_FRIENDLY }));
                entity.p.shots.push(shot);
            }
        }

    }
});

Q.scene("mainLevel", function(stage) {
    Q.gravity = 0;
    stage.insert(new Q.Sprite({ asset: "../images/space.jpg", x: Q.el.width / 2, y: Q.el.height / 2, type: Q.SPRITE_NONE }));
    stage.insert(new Q.Player());
     

});
Q.load(["../images/space.jpg", "../images/new.png","../images/shot.png", "../data/player.json", "../data/shot.json"], function () {


    Q.compileSheets("../images/new.png", "../data/player.json");
    Q.compileSheets("../images/shot.png", "../data/shot.json");
    Q.animations("player", { default: { frames: [0, 1, 2, 3], rate: 1 / 4 } });
    Q.animations("shot", { default: { frames: [0, 1, 2, 3], rate: 1 / 4 } });
    Q.stageScene("mainLevel");
});
