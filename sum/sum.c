int sum(int* start, int count) {
  int sum = 0;
  for (int i = 0; i < count; i++) {
    sum += start[i];
  }
  return sum;
}

