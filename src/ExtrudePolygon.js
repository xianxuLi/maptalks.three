import * as maptalks from 'maptalks';
import * as THREE from 'three';
import BaseObject from './BaseObject';
import { getExtrudeGeometry, initVertexColors } from './util/ExtrudeUtil';

const OPTIONS = {
    altitude: 0,
    height: 1,
    topColor: null,
    bottomColor: '#2d2f61',
};

/**
 *
 */
class ExtrudePolygon extends BaseObject {
    constructor(polygon, options, material, layer) {
        options = maptalks.Util.extend({}, OPTIONS, options, { layer, polygon });
        super();
        this._initOptions(options);
        const { height, topColor, bottomColor, altitude } = options;
        const geometry = getExtrudeGeometry(polygon, height, layer);
        if (topColor && !material.map) {
            initVertexColors(geometry, bottomColor, topColor);
            material.vertexColors = THREE.VertexColors;
        }
        this._createMesh(geometry, material);
        const center = polygon.getCenter();
        const z = layer.distanceToVector3(altitude, altitude).x;
        const v = layer.coordinateToVector3(center, z);
        this.getObject3d().position.copy(v);
    }
}

export default ExtrudePolygon;
