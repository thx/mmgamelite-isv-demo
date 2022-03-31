const data = {
    version: 2,
    stage: null,
    background: 0xffffff,
    width: 590,
    height: 950,
    framerate: 24,
    totalFrames: 1,
    assets: {
        "btn_close": "btn_close.png",
        "r_rule": "r_rule.png"
    },
    lib: {},
    shapes: {},
    textures: {},
    spritesheets: [],
    getTexture: function (id) {
        if (data.textures[id]) {
            return data.textures[id];
        }
        const atlas = data.spritesheets.find(atlas => !!atlas.textures[id]);
        return atlas ? atlas.textures[id] : null;
    },
    setup: function (animate) {
        const MovieClip = animate.MovieClip;
        const Container = animate.Container;
        const Sprite = animate.Sprite;


        data.lib.btn_close = class extends Container {
            constructor() {
                super();
                const instance1 = new Sprite(data.getTexture("btn_close"))
                    .setTransform(-36, -36);
                this.addChild(instance1);
            }
        };

        data.lib.popchild = class extends MovieClip {
            constructor() {
                super({
                    duration: 1,
                    framerate: 24
                });
                const instance2 = new Sprite(data.getTexture("r_rule"));
                const instance1 = new data.lib.btn_close()
                    .setTransform(295.5, 1005.9);
                this[instance1.name = "btn_close"] = instance1;
                this.addChild(instance2, instance1);
            }
        };
        data.stage = data.lib.popchild;
    }
};


export default data;