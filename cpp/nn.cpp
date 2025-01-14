struct Layer {
  Matrix outputs;
  Matrix biased;
  Matrix weights;

  // Constructors, Except for input layer we create layers from
  // previous layer updating weights.
  Layer(int neuron_count);
  Layer next_layer(int neuron_count);
};

void forward(Layer& curr, Layer& prev) {
  curr.outputs = sigmoid_matrix(
    (prev.outputs * prev.weights) + curr.biased
  );
}

Layer::Layer(int neuron_count) {
  outputs.init(1, neuron_count);
  biased.init(1, neuron_count);
}

Layer Layer::next_layer(int neuron_count) {
  Layer next;
  next.outputs.init(1, neuron_count);
  next.biased.init(1, neuron_count);
  weights.init(this->outputs.cols(), next.outputs.cols());
  return next;
}
