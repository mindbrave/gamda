
import { assert } from "chai";
import { 
    addVectors, subtractVectors, scaleVector, vectorMagnitude, clampVector, projectVectorOntoXY, rotateVectorAroundZ,
    perpendicularVectorXY
} from "../vectors";

describe("Adding vectors", () => {
    test("Add two vectors", () => {
        const v1 = {x: 0, y: 0, z: 0};
        const v2 = {x: 1, y: 1, z: 1};

        assert.deepEqual(addVectors(v1)(v2), {x: 1, y: 1, z: 1});
    });
});

describe("Subtracting vectors", () => {
    test("Subtract two vectors", () => {
        const v1 = {x: 0, y: 0, z: 0};
        const v2 = {x: 1, y: 1, z: 1};

        assert.deepEqual(subtractVectors(v1)(v2), {x: -1, y: -1, z: -1});
    });
});

describe("Scaling vectors", () => {
    test("Scale vector", () => {
        const v1 = {x: 2, y: 3, z: -1};
        const factor = 3.0;

        assert.deepEqual(scaleVector(factor)(v1), {x: 6, y: 9, z: -3});
    });
});

describe("Clamping vectors", () => {
    test("Clamp vector longer than clamp value", () => {
        const v1 = {x: 3, y: 4, z: 5};  // length about 7
        const clampTo = 2.0;

        const clamped = clampVector(clampTo)(v1);

        assert.closeTo(vectorMagnitude(clamped), clampTo, 0.0000001);
    });

    test("Clamp vector shorter than clamp value", () => {
        const v1 = {x: 3, y: 4, z: 5};  // length about 7
        const clampTo = 10.0;

        const clamped = clampVector(clampTo)(v1);

        assert.deepEqual(clamped, v1);
    });
});

describe("Project vectors", () => {
    test("Project vector onto XY plane", () => {
        const v1 = {x: 3, y: 4, z: 5};

        const projected = projectVectorOntoXY(v1);

        assert.deepEqual(projected, {x: 3, y: 4, z: 0});
    });
});

describe("Rotate vectors", () => {
    test("Rotate around Z axis", () => {
        const v1 = {x: 1, y: 1, z: 1};

        const rotated = rotateVectorAroundZ(Math.PI)(v1);
        
        assert.closeTo(rotated.x, -1, 0.00000001);
        assert.closeTo(rotated.y, -1, 0.00000001);
        assert.closeTo(rotated.z, 1, 0.00000001);
    });

    test("Rotate around Z axis", () => {
        const v1 = {x: 1, y: 1, z: 1};

        const rotated = rotateVectorAroundZ(4 * Math.PI)(v1);
        
        assert.closeTo(rotated.x, 1, 0.00000001);
        assert.closeTo(rotated.y, 1, 0.00000001);
        assert.closeTo(rotated.z, 1, 0.00000001);
    });
});

describe("Vector perpendicular", () => {
    test("Get perpendicular vector", () => {
        const v1 = {x: 1, y: 1, z: 0};

        const perpendicular = perpendicularVectorXY(v1);
        
        assert.deepEqual(perpendicular, {x: -1, y: 1, z: 0})
    });

    test("Get perpendicular vector", () => {
        const v1 = {x: 0, y: -1, z: 0};

        const perpendicular = perpendicularVectorXY(v1);
        
        assert.deepEqual(perpendicular, {x: 1, y: 0, z: 0})
    });

    test("Get perpendicular vector for zero vector", () => {
        const v1 = {x: 0, y: 0, z: 0};

        const perpendicular = perpendicularVectorXY(v1);
        
        assert.deepEqual(perpendicular, {x: -0, y: 0, z: 0})
    });
});