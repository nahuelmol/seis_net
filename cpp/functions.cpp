
#include <cmath>

float sigmoid(float x) {
    float result = 1.f /(1.f + expf(-x));
    return result;
}

