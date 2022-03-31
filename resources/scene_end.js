const data = {
    version: 2,
    stage: null,
    background: 0xffffff,
    width: 750,
    height: 1334,
    framerate: 24,
    totalFrames: 1,
    assets: {
        "r7": "r7.png",
        "r_start_bg": "r_start_bg.jpg",
        "scene_end": "scene_end.shapes.txt"
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


        data.lib.c = class extends Container {
            constructor() {
                super();
                const instance1 = new Sprite(data.getTexture("r7"))
                    .setTransform(-130, -120);
                this.addChild(instance1);
            }
        };

        data.lib.mc_box = class extends MovieClip {
            constructor() {
                super({
                    duration: 35
                });
                const instance1 = new data.lib.c();
                this.addTimedChild(instance1, 0, 35, {
                    "0": {
                        sx: 1,
                        sy: 1,
                        tw: {
                            d: 14,
                            p: {
                                sx: 1.139,
                                sy: 1.139
                            }
                        }
                    },
                    "14": {
                        tw: {
                            d: 20,
                            p: {
                                sx: 1,
                                sy: 1
                            }
                        }
                    }
                });
            }
        };

        data.lib.btn_retry = class extends Container {
            constructor() {
                super();
                const instance2 = new Graphics()
                    .drawCommands(data.shapes.scene_end[1]);
                const instance1 = new Text("再玩一次")
                    .setStyle({
                        fontFamily: "Verdana",
                        fontSize: 44,
                        fill: "#fff",
                        leading: 2
                    })
                    .setAlign("center")
                    .setTransform(-13.074999999999989, -36.95);
                this.addChild(instance2, instance1);
            }
        };

        data.lib.mc_scene_end = class extends Container {
            constructor() {
                super();
                const instance5 = new Graphics()
                    .drawCommands(data.shapes.scene_end[2]);
                const instance4 = new Sprite(data.getTexture("r_start_bg"))
                    .setTransform(-375, -812);
                const instance3 = new data.lib.btn_retry()
                    .setTransform(0, 459.3);
                this[instance3.name = "btn_retry"] = instance3;
                const instance2 = new data.lib.mc_box()
                    .setTransform(0, -164);
                const instance1 = new Graphics()
                    .drawCommands(data.shapes.scene_end[0]);
                this.addChild(instance5, instance4, instance3, instance2, instance1);
            }
        };

        data.lib.scene_end = class extends MovieClip {
            constructor() {
                super({
                    duration: 1,
                    framerate: 24
                });
                const instance1 = new data.lib.mc_scene_end()
                    .setTransform(375, 667);
                this[instance1.name = "scene_end"] = instance1;
                this.addChild(instance1);
            }
        };
        data.stage = data.lib.scene_end;
    }
};


export default data;
