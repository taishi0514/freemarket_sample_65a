# 服のサイズ(配列)
ary_clothes_size = [{name: "XXS以下"},{name: "XS(SS)"},{name: "S"},{name: "M"},{name: "L"},{name: "XL(LL)"},{name: "2XL(3L)"},{name: "3XL(4L)"},{name: "4XL(5L)以上"},{name: "FREE SIZE"}]
# メンズ靴のサイズ(配列)
ary_shoes_size_mems = [{name: "23.5cm以下"},{name: "24cm"},{name: "24.5cm"},{name: "25cm"},{name: "25.5cm"},{name: "26cm"},{name: "26.5cm"},{name: "27cm"},{name: "27.5cm"},{name: "28cm"},{name: "28.5cm"},{name: "29cm"},{name: "29.5cm"},{name: "30cm"},{name: "30.5cm"},{name: "31cm以上"}]
# レディース靴のサイズ(配列)
ary_shoes_size_ladies = [{name: "20cm以下"},{name: "20.5cm"},{name: "21cm"},{name: "21.5cm"},{name: "22cm"},{name: "22.5cm"},{name: "23cm"},{name: "23.5cm"},{name: "24cm"},{name: "24.5cm"},{name: "25cm"},{name: "25.5cm"},{name: "26cm"},{name: "26.5cm"},{name: "27cm"},{name: "27.5cm以上"}]
 

# 親：洋服のサイズ
clothes = ProductSize.create(name: "洋服のサイズ")
# 子：洋服のサイズ
clothes.children.create(ary_clothes_size)

# 親：メンズ靴のサイズ
mensshoes = ProductSize.create(name: "メンズ靴のサイズ")
# 子：メンズ靴のサイズ
mensshoes.children.create(ary_shoes_size_mems)

# 親：レディース靴のサイズ
ladiesshoes = ProductSize.create(name: "レディース靴のサイズ")
# 子：レディース靴のサイズ
ladiesshoes.children.create(ary_shoes_size_ladies)
