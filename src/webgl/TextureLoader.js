import {Texture} from 'ogl/src/index.mjs';

export default {
    textureCache: {},
    getTexture(gl, src, generateMipmaps = true) {
        if (this.textureCache[src]) return this.textureCache[src];
        const texture = new Texture(gl, {generateMipmaps});
        const image = new Image();
        this.textureCache[src] = texture;
        image.onload = () => {
            texture.image = image;
        };
        image.src = src;
        return texture;
    }
  };