
import { assoc, curry, pipe, lte, complement, multiply, evolve } from "ramda";

export interface Vec<UNIT = number> {
    x: UNIT;
    y: UNIT;
    z: UNIT;
}

export type Radians = number;
export type Direction = Vec<number>;

export const addVectors = curry((v1: Vec, v2: Vec): Vec => ({
    x: v1.x + v2.x,
    y: v1.y + v2.y,
    z: v1.z + v2.z,
}));

export const subtractVectors = curry((v1: Vec, v2: Vec): Vec => ({
    x: v1.x - v2.x,
    y: v1.y - v2.y,
    z: v1.z - v2.z,
}));

type scaleVector = (factor: number) => (v: Vec) => Vec;
export const scaleVector: scaleVector = factor => evolve({
    x: multiply(factor),
    y: multiply(factor),
    z: multiply(factor),
});

export const vectorMagnitude = (v: Vec): number => Math.sqrt(v.x ** 2 + v.y ** 2 + v.z ** 2);

export const vectorSqrMagnitude = (v: Vec): number => v.x ** 2 + v.y ** 2 + v.z ** 2;

export const normalizeVector = (v: Vec): Vec => {
    const magnitude = vectorMagnitude(v);
    return vectorSqrMagnitude(v) === 0.0 ? v : {x: v.x / magnitude, y: v.y / magnitude, z: v.z / magnitude};
};

export const divideVector = curry((factor: number, v: Vec): Vec => ({x: v.x / factor, y: v.y / factor, z: v.z / factor}));

export const negateVector = (v: Vec): Vec => ({x: -v.x, y: -v.y, z: -v.z});

export const clampVector = curry((clampTo: number, v: Vec): Vec => (
    lte(vectorSqrMagnitude(v), clampTo ** 2) ? v : pipe(normalizeVector, scaleVector(clampTo))(v))
);

type projectVectorOntoXY = (v: Vec) => Vec;
export const projectVectorOntoXY: projectVectorOntoXY = assoc("z", 0);

export const dotProduct = curry((v1: Vec, v2: Vec): number => v1.x * v2.x + v1.y * v2.y + v1.z * v2.z);

type rotateVectorAroundZ = (angle: Radians) => (v: Vec) => Vec;
export const rotateVectorAroundZ: rotateVectorAroundZ = angle => v => ({
    x: Math.cos(angle) * v.x - Math.sin(angle) * v.y,
    y: Math.sin(angle) * v.x + Math.cos(angle) * v.y,
    z: v.z,
});

type perpendicularVectorXY = (v: Vec) => Vec;
export const perpendicularVectorXY: perpendicularVectorXY = v => ({x: -v.y, y: v.x, z: 0});


export const isZeroVector = (v: Vec): boolean => v.x === 0 && v.y === 0 && v.z === 0;
export const isNotZeroVector = complement(isZeroVector);

export const vecToArray = (v: Vec): number[] => [v.x, v.y, v.z];

export const vecXYZToXZY = (v: Vec): Vec => ({x: v.x, y: v.z, z: v.y});
export const vecXZYToXYZ = vecXYZToXZY;
