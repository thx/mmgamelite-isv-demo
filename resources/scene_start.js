const data = {
    version: 2,
    stage: null,
    background: 0xffffff,
    width: 750,
    height: 1334,
    framerate: 24,
    totalFrames: 1,
    assets: {
        "r_visual": "r_visual.png",
        "r_start_bg": "r_start_bg.jpg",
        "scene_start": "scene_start.shapes.txt"
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
        const Text = animate.Text;
        const Graphics = animate.Graphics;


        data.lib.btn_rule = class extends Container {
            constructor() {
                super();
                const instance2 = new Graphics()
                    .drawCommands(data.shapes.scene_start[0]);
                const instance1 = new Text("规则")
                    .setStyle({
                        fontFamily: "Verdana",
                        fontSize: 26,
                        fill: "#fff",
                        leading: 2
                    })
                    .setAlign("center")
                    .setTransform(0, -17.15);
                this.addChild(instance2, instance1);
            }
        };

        data.lib.btn = class extends Container {
            constructor() {
                super();
                const instance2 = new Graphics()
                    .drawCommands(data.shapes.scene_start[1]);
                const instance1 = new Text("开始互动")
                    .setStyle({
                        fontFamily: "Verdana",
                        fontSize: 44,
                        fill: "#fff",
                        leading: 2
                    })
                    .setAlign("center")
                    .setTransform(3.9750000000000085, -30.7);
                this[instance1.name = "text_start"] = instance1;
                this.addChild(instance2, instance1);
            }
        };

        data.lib.btn_start = class extends MovieClip {
            constructor() {
                super({
                    duration: 25
                });
                const instance1 = new data.lib.btn();
                this.addTimedChild(instance1, 0, 25, {
                    "0": {
                        x: 4.95,
                        y: 1,
                        sx: 1,
                        sy: 1,
                        tw: {
                            d: 9,
                            p: {
                                sx: 1.063,
                                sy: 1.063
                            }
                        }
                    },
                    "9": {
                        tw: {
                            d: 15,
                            p: {
                                sx: 1,
                                sy: 1
                            }
                        }
                    }
                });
            }
        };

        data.lib.mc_scene_start = class extends Container {
            constructor() {
                super();
                const instance5 = new Graphics()
                    .drawCommands(data.shapes.scene_start[2]);
                const instance4 = new Sprite(data.getTexture("r_start_bg"))
                    .setTransform(-375, -812);
                const instance3 = new Sprite(data.getTexture("r_visual"))
                    .setTransform(-315, -424, 0.85, 0.85);
                const instance2 = new data.lib.btn_start()
                    .setTransform(-2.9, 529.25);
                this[instance2.name = "btn_start"] = instance2;
                const instance1 = new data.lib.btn_rule()
                    .setTransform(270.4, -477);
                this[instance1.name = "btn_rule"] = instance1;
                this.addChild(instance5, instance4, instance3, instance2, instance1);
            }
        };

        data.lib.scene_start = class extends MovieClip {
            constructor() {
                super({
                    duration: 1,
                    framerate: 24
                });
                const instance1 = new data.lib.mc_scene_start()
                    .setTransform(375, 667);
                this[instance1.name = "scene_start"] = instance1;
                this.addChild(instance1);
            }
        };
        data.stage = data.lib.scene_start;
    }
};


export default data;
