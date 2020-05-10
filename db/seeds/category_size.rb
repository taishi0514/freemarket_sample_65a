parents = Category.where(ancestry: nil)
size_cloth = ProductSize.where(name: "洋服のサイズ").where(ancestry: nil)
size_shoes_mens = ProductSize.where(name: "メンズ靴のサイズ").where(ancestry: nil)
size_shoes_ladies = ProductSize.where(name: "レディース靴のサイズ").where(ancestry: nil)

def set_categorysize(child, sizes)
  child.children.each do |grandchild|
    sizes.each do |size|
      # 孫カテゴリーのサイズをセット
      CategorySize.create(category_id: grandchild.id, product_size_id: size.id)
    end
  end
end

parents.each do |parent|
  parent.children.each do |child|
    unless child.name == "靴"
      # 孫カテゴリーのサイズをセット
      set_categorysize(child, size_cloth) 
    else
      if parent.name == "レディース"
          # レディース靴のサイズ
          sizes = size_shoes_ladies
      else
          # メンズ靴のサイズ
          sizes = size_shoes_mens
      end
      # 孫カテゴリーのサイズをセット
      set_categorysize(child, sizes) 
    end
  end
end