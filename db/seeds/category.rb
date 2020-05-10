ary_tops = [{name: "Tシャツ/カットソー(半袖/袖なし)"},{name: "Tシャツ/カットソー(七分/長袖)"},{name: "その他"}]
ary_jacket = [{name: "テーラードジャケット"},{name: "ノーカラージャケット"},{name: "Gジャン/デニムジャケット"},{name: "その他"}]
ary_shoes = [{name: "スニーカー"},{name: "サンダル"},{name: "その他"}]

# 親：レディース
lady = Category.create(name: "レディース")

# 子：レディース／トップス
lady_tops = lady.children.create(name: "トップス")

# 孫：レディース／トップス
lady_tops.children.create(ary_tops)

# 子：レディース／アウター
lady_jacket = lady.children.create(name: "ジャケット/アウター")

# 孫：レディース／アウター
lady_jacket.children.create(ary_jacket)

# 子：レディース／靴
lady_tops = lady.children.create(name: "靴")

# 孫：レディース／靴
lady_tops.children.create(ary_shoes)

# 親：メンズ
men = Category.create(name: "メンズ")

# 子：メンズ／トップス
men_tops = men.children.create(name: "トップス")

# 孫：メンズ／トップス
men_tops.children.create(ary_tops)

# 子：メンズ／アウター
men_jacket = men.children.create(name: "ジャケット/アウター")

# 孫：メンズ／アウター
men_jacket.children.create(ary_jacket)

# 子：メンズ／靴
men_tops = men.children.create(name: "靴")

# 孫：メンズ／靴
men_tops.children.create(ary_shoes)

