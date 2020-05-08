# 発送方法を表示する
json.array! @shippingways do |shippingway|
  json.id shippingway.id
  json.name shippingway.name
end