# 親：配送料の負担
advancepay = Shippingway.create(name: "送料込み（出品者負担）")

# 子：配送の方法（送料込み（出品者負担））
advancepay_way = advancepay.children.create([{ name: "未定"},{ name: "らくらくFRIMA便"},{ name: "ゆうメール"},{ name: "レターパック"},{ name: "普通郵便（定形、定形外）"},{ name: "クロネコヤマト"},{ name: "ゆうパック"},{ name: "クリックポスト"},{ name: "ゆうパケット"}])

# 親：配送料の負担
deliverypay = Shippingway.create(name: "着払い（購入者負担）")

# 子：配送の方法（送料込み（出品者負担））
deliverypay_way = deliverypay.children.create([{ name: "未定"},{ name: "クロネコヤマト"},{ name: "ゆうパック"},{ name: "ゆうメール"}])
