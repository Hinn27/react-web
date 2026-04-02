import os
import django
import json

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'refood.settings')
django.setup()

from recommendations.models import Meal

# Sample meal data
meals_data = [
    {
        "name": "Phở Bò Gia Truyền",
        "price": 50000,
        "image": "/assets/images/food/pho-bo.jpg",
        "description": "Nước dùng ninh xương 12 tiếng, thịt bò tái chín mềm",
        "full_description": "Phở bò gia truyền với nước dùng được ninh từ xương bò trong 12 tiếng, tái chín mềm thơm. Ăn kèm giá đỗ, rau thơm, chanh ớt tươi. Món ăn kinh điển để tiếp sức cho đêm làm việc dài.",
        "time": "15 phút",
        "tag": "Bán chạy",
        "rating": 4.8,
        "reviews": 256,
        "category": "Bún/Phở",
        "origin": "Hà Nội",
        "calories": "450 kcal",
        "ingredients": "Bò, xương bò, bún, rau thơm, gia vị",
        "nutritional_info": {
            "calories": 450,
            "protein": 25,
            "carbs": 60,
            "fat": 15
        }
    },
    {
        "name": "Bánh Mì Thịt Nướng",
        "price": 25000,
        "image": "/assets/images/food/banh-mi-thit.jpg",
        "description": "Bánh mì giòn rụm, thịt nướng than hoa thơm lừng",
        "full_description": "Bánh mì vỏ giòn ruột mềm, nhân thịt heo nướng than hoa thơm lừng, đồ chua rau ngò rắc mỡ hành. Món ăn nhanh gọn cho những phút nghỉ ngắn giữa ca đêm.",
        "time": "10 phút",
        "tag": "Nhanh",
        "rating": 4.6,
        "reviews": 189,
        "category": "Bánh mì",
        "origin": "Sài Gòn",
        "calories": "380 kcal",
        "ingredients": "Bánh mì, thịt heo, rau, gia vị",
        "nutritional_info": {
            "calories": 380,
            "protein": 20,
            "carbs": 45,
            "fat": 12
        }
    },
    {
        "name": "Cơm Tấm Sườn Nướng",
        "price": 45000,
        "image": "/assets/images/food/com-tam-suon-nuong.jpg",
        "description": "Sườn nướng mắm, bì trộn, chả trứng, nước mắm pha",
        "full_description": "Cơm tấm hạt dẻo thơm, sườn nướng mắm đậm vị, bì trộn giòn sật, chả trứng hấp mềm. Nước mắm pha ngọt thanh, ăn kèm đồ chua dưa leo. Phần ăn đầy đủ dinh dưỡng.",
        "time": "20 phút",
        "tag": "Đầy đủ",
        "rating": 4.9,
        "reviews": 312,
        "category": "Cơm",
        "origin": "Sài Gòn",
        "calories": "550 kcal",
        "ingredients": "Cơm, sườn heo, trứng, rau, gia vị",
        "nutritional_info": {
            "calories": 550,
            "protein": 30,
            "carbs": 65,
            "fat": 20
        }
    },
    {
        "name": "Bún Bò Huế",
        "price": 55000,
        "image": "/assets/images/food/bun-bo-hue.jpg",
        "description": "Bún bò cay nồng đặc trưng xứ Huế, giò heo mềm rục",
        "full_description": "Bún bò Huế đậm đà với nước dùng ninh xương, sả, ruốc Huế cay nồng đặc trưng. Giò heo mềm rục, chả cua thơm ngậy. Tô bún nóng hổi xua tan cái lạnh đêm khuya.",
        "time": "18 phút",
        "tag": "Đặc sản",
        "rating": 4.7,
        "reviews": 198,
        "category": "Bún/Phở",
        "origin": "Huế",
        "calories": "520 kcal",
        "ingredients": "Bò, giò heo, chả cua, rau, gia vị",
        "nutritional_info": {
            "calories": 520,
            "protein": 28,
            "carbs": 58,
            "fat": 18
        }
    },
    {
        "name": "Hủ Tiếu Nam Vang",
        "price": 40000,
        "image": "/assets/images/food/hu-tieu.jpg",
        "description": "Hủ tiếu dai mềm, nước lèo trong, tôm thịt hải sản",
        "full_description": "Hủ tiếu Nam Vang với sợi dai mềm, nước lèo trong veo ngọt thanh từ xương heo và tôm khô. Tôm tươi, thịt bằm, gan, trứng cút đầy đặn. Món ăn nhẹ bụng cho đêm dài.",
        "time": "15 phút",
        "tag": "Nhẹ bụng",
        "rating": 4.5,
        "reviews": 145,
        "category": "Bún/Phở",
        "origin": "Sài Gòn",
        "calories": "420 kcal",
        "ingredients": "Hủ tiếu, tôm, thịt heo, rau, gia vị",
        "nutritional_info": {
            "calories": 420,
            "protein": 22,
            "carbs": 55,
            "fat": 10
        }
    },
    {
        "name": "Bún Chả Hà Nội",
        "price": 45000,
        "image": "/assets/images/food/bun-cha.jpg",
        "description": "Chả viên nướng than, bún tươi, nước chấm chua ngọt",
        "full_description": "Bún chả Hà Nội chuẩn vị với chả viên và chả miếng nướng than hoa thơm lừng. Bún tươi trắng dẻo, rau sống tươi mát. Nước chấm pha chua ngọt vừa vặn, thêm ớt tỏi.",
        "time": "20 phút",
        "tag": "Truyền thống",
        "rating": 4.8,
        "reviews": 267,
        "category": "Bún/Phở",
        "origin": "Hà Nội",
        "calories": "480 kcal",
        "ingredients": "Bún, chả viên, rau sống, gia vị",
        "nutritional_info": {
            "calories": 480,
            "protein": 26,
            "carbs": 52,
            "fat": 16
        }
    },
    {
        "name": "Bò Né Sài Gòn",
        "price": 55000,
        "image": "/assets/images/food/bo-ne.jpg",
        "description": "Bò bít tết sốt tiêu, trứng ốp la, bánh mì nóng",
        "full_description": "Bò né kiểu Sài Gòn với miếng bò bít tết mỡ sốt tiêu đen đặc trưng, trứng ốp la lòng đào, pate béo ngậy. Ăn kèm bánh mì nóng giòn. Bữa sáng-đêm năng lượng.",
        "time": "15 phút",
        "tag": "Năng lượng",
        "rating": 4.6,
        "reviews": 178,
        "category": "Cơm/Đồ ăn",
        "origin": "Sài Gòn",
        "calories": "580 kcal",
        "ingredients": "Bò, trứng, bánh mì, pate, gia vị",
        "nutritional_info": {
            "calories": 580,
            "protein": 32,
            "carbs": 45,
            "fat": 25
        }
    },
    {
        "name": "Mì Quảng",
        "price": 45000,
        "image": "/assets/images/food/mi-quang.jpg",
        "description": "Mì Quảng tôm thịt, nước lèo đậm đà, bánh tráng giòn",
        "full_description": "Mì Quảng Đà Nẵng chính gốc với sợi mì vàng dai, nước lèo đậm đà nghệ và tôm thịt. Tôm tươi, thịt heo, trứng cút, rau sống, đậu phộng rang, bánh tráng nướng giòn.",
        "time": "18 phút",
        "tag": "Đặc sản",
        "rating": 4.9,
        "reviews": 234,
        "category": "Bún/Phở",
        "origin": "Đà Nẵng",
        "calories": "500 kcal",
        "ingredients": "Mì, tôm, thịt heo, rau, gia vị",
        "nutritional_info": {
            "calories": 500,
            "protein": 27,
            "carbs": 60,
            "fat": 14
        }
    },
    {
        "name": "Cơm Gà Xối Mỡ",
        "price": 50000,
        "image": "/assets/images/food/com-ga-xoi-mo.jpg",
        "description": "Cơm gà xối mỡ giòn rụm, nước mắm tỏi ớt đặc biệt",
        "full_description": "Cơm gà xối mỡ với đùi gà chiên giòn rụm vàng ươm, cơm dẻo thấm nước cốt gà. Nước mắm tỏi ớt pha đặc biệt, đồ chua dưa leo tươi. Phần ăn no bụng, giá phải chăng.",
        "time": "20 phút",
        "tag": "No bụng",
        "rating": 4.7,
        "reviews": 201,
        "category": "Cơm",
        "origin": "Sài Gòn",
        "calories": "620 kcal",
        "ingredients": "Cơm, gà, rau, gia vị",
        "nutritional_info": {
            "calories": 620,
            "protein": 35,
            "carbs": 70,
            "fat": 22
        }
    },
    {
        "name": "Cao Lầu Hội An",
        "price": 55000,
        "image": "/assets/images/food/cao-lau.jpg",
        "description": "Sợi cao lầu dai giòn, thịt xá xíu đậm vị, rau sống tươi",
        "full_description": "Cao lầu Hội An chuẩn vị với sợi mì vàng dai, thịt xá xíu mềm thơm, da heo chiên giòn và rau sống Trà Quế. Hương vị mộc mạc nhưng rất riêng của phố cổ.",
        "time": "18 phút",
        "tag": "Miền Trung",
        "rating": 4.8,
        "reviews": 176,
        "category": "Bún/Phở",
        "origin": "Hội An",
        "calories": "510 kcal",
        "ingredients": "Mì cao lầu, thịt xá xíu, rau sống, gia vị",
        "nutritional_info": {
            "calories": 510,
            "protein": 24,
            "carbs": 58,
            "fat": 17
        }
    },
    {
        "name": "Cháo Sườn Quẩy",
        "price": 30000,
        "image": "/assets/images/food/pho-bo.jpg",
        "description": "Cháo sánh mịn, sườn mềm, quẩy giòn nóng",
        "full_description": "Cháo sườn ninh nhừ với gạo tẻ thơm, sườn non mềm rục, thêm quẩy giòn và tiêu hành. Món ăn ấm bụng, hợp những đêm muộn và sáng sớm.",
        "time": "12 phút",
        "tag": "Ấm bụng",
        "rating": 4.7,
        "reviews": 143,
        "category": "Cháo",
        "origin": "Hà Nội",
        "calories": "360 kcal",
        "ingredients": "Gạo tẻ, sườn non, quẩy, hành lá",
        "nutritional_info": {
            "calories": 360,
            "protein": 18,
            "carbs": 42,
            "fat": 10
        }
    },
    {
        "name": "Bánh Xèo Miền Tây",
        "price": 45000,
        "image": "/assets/images/food/com-tam-suon-nuong.jpg",
        "description": "Vỏ bánh giòn rụm, tôm thịt đầy đặn, rau sống cuốn lá",
        "full_description": "Bánh xèo vàng ươm, vỏ mỏng giòn với nhân tôm thịt, giá đỗ và hành lá. Ăn kèm rau sống, bánh tráng và nước mắm chua ngọt đúng điệu miền Tây.",
        "time": "20 phút",
        "tag": "Giòn rụm",
        "rating": 4.8,
        "reviews": 219,
        "category": "Món cuốn",
        "origin": "Cần Thơ",
        "calories": "480 kcal",
        "ingredients": "Bột gạo, tôm, thịt heo, giá đỗ, rau sống",
        "nutritional_info": {
            "calories": 480,
            "protein": 21,
            "carbs": 52,
            "fat": 19
        }
    },
    {
        "name": "Bún Riêu Cua",
        "price": 40000,
        "image": "/assets/images/food/hu-tieu.jpg",
        "description": "Nước riêu cua thanh ngọt, đậu hũ, chả cua, cà chua",
        "full_description": "Bún riêu cua với nước dùng chua nhẹ từ cà chua, riêu cua béo thơm, đậu hũ chiên và chả cua đầy đặn. Thêm rau sống và mắm tôm cho đúng vị truyền thống.",
        "time": "16 phút",
        "tag": "Dân dã",
        "rating": 4.6,
        "reviews": 188,
        "category": "Bún/Phở",
        "origin": "Hà Nội",
        "calories": "430 kcal",
        "ingredients": "Bún, cua, cà chua, đậu hũ, rau sống",
        "nutritional_info": {
            "calories": 430,
            "protein": 20,
            "carbs": 48,
            "fat": 12
        }
    },
    {
        "name": "Hàu Nướng Mỡ Hành",
        "price": 60000,
        "image": "/assets/images/food/bo-ne.jpg",
        "description": "Hàu béo tươi, mỡ hành thơm, đậu phộng giòn",
        "full_description": "Hàu nướng mỡ hành nóng hổi, hàu tươi béo ngậy quyện cùng mỡ hành thơm lừng và đậu phộng rang giòn. Món ăn hải sản đậm vị cho những buổi tụ tập.",
        "time": "15 phút",
        "tag": "Hải sản",
        "rating": 4.9,
        "reviews": 167,
        "category": "Đồ ăn khác",
        "origin": "Nha Trang",
        "calories": "390 kcal",
        "ingredients": "Hàu, mỡ hành, đậu phộng, gia vị",
        "nutritional_info": {
            "calories": 390,
            "protein": 23,
            "carbs": 12,
            "fat": 24
        }
    },
    {
        "name": "Cơm Tấm Chả Trứng",
        "price": 42000,
        "image": "/assets/images/food/com-tam-suon-nuong.jpg",
        "description": "Cơm tấm dẻo thơm, chả trứng béo, mắm chua ngọt",
        "full_description": "Cơm tấm sườn chả trứng với hạt cơm tấm dẻo thơm, chả trứng hấp mềm, sườn nướng đậm vị và mắm chua ngọt. Phần ăn no vừa, phù hợp bữa trưa hay bữa khuya.",
        "time": "18 phút",
        "tag": "Phổ biến",
        "rating": 4.7,
        "reviews": 242,
        "category": "Cơm",
        "origin": "Sài Gòn",
        "calories": "560 kcal",
        "ingredients": "Cơm tấm, sườn, chả trứng, đồ chua",
        "nutritional_info": {
            "calories": 560,
            "protein": 29,
            "carbs": 62,
            "fat": 21
        }
    },
    {
        "name": "Miến Gà Xé",
        "price": 35000,
        "image": "/assets/images/food/pho-bo.jpg",
        "description": "Miến trong, gà xé mềm, nước dùng thanh ngọt",
        "full_description": "Miến gà xé với nước dùng trong ngọt thanh từ xương gà, thịt gà xé mềm, nấm hương và hành lá. Món ăn nhẹ nhàng, dễ ăn, hợp mọi thời điểm trong ngày.",
        "time": "14 phút",
        "tag": "Thanh nhẹ",
        "rating": 4.5,
        "reviews": 121,
        "category": "Bún/Phở",
        "origin": "Hà Nội",
        "calories": "340 kcal",
        "ingredients": "Miến, gà, nấm hương, hành lá",
        "nutritional_info": {
            "calories": 340,
            "protein": 22,
            "carbs": 38,
            "fat": 8
        }
    },
    {
        "name": "Gỏi Cuốn Tôm Thịt",
        "price": 35000,
        "image": "/assets/images/food/banh-mi-thit.jpg",
        "description": "Cuốn tươi thanh mát, tôm thịt, bún, rau sống",
        "full_description": "Gỏi cuốn tôm thịt với rau sống giòn mát, bún tươi, tôm luộc và thịt ba chỉ cuốn khéo léo trong bánh tráng mỏng. Chấm cùng tương đậu hoặc nước mắm chua ngọt.",
        "time": "10 phút",
        "tag": "Ăn vặt",
        "rating": 4.6,
        "reviews": 164,
        "category": "Món cuốn",
        "origin": "Sài Gòn",
        "calories": "310 kcal",
        "ingredients": "Bánh tráng, tôm, thịt ba chỉ, rau sống, bún",
        "nutritional_info": {
            "calories": 310,
            "protein": 19,
            "carbs": 35,
            "fat": 11
        }
    },
    {
        "name": "Nem Rán Hà Nội",
        "price": 40000,
        "image": "/assets/images/food/com-ga-xoi-mo.jpg",
        "description": "Nem giòn rụm, nhân thịt rau củ đậm vị",
        "full_description": "Nem rán Hà Nội giòn rụm với nhân thịt băm, mộc nhĩ, miến, cà rốt và gia vị. Ăn nóng với bún, rau sống và nước chấm chua ngọt tạo nên hương vị quen thuộc.",
        "time": "20 phút",
        "tag": "Truyền thống",
        "rating": 4.8,
        "reviews": 208,
        "category": "Đồ ăn khác",
        "origin": "Hà Nội",
        "calories": "420 kcal",
        "ingredients": "Thịt băm, mộc nhĩ, miến, cà rốt, bánh đa",
        "nutritional_info": {
            "calories": 420,
            "protein": 18,
            "carbs": 40,
            "fat": 18
        }
    },
    {
        "name": "Lẩu Riêu Cua",
        "price": 120000,
        "image": "/assets/images/food/hu-tieu.jpg",
        "description": "Lẩu cua thanh ngọt, đậu phụ, chả cua, rau sống",
        "full_description": "Lẩu riêu cua nóng hổi với nước dùng chua thanh, riêu cua thơm béo, đậu phụ, cà chua và đa dạng rau ăn kèm. Phù hợp bữa sum họp gia đình hoặc nhóm bạn.",
        "time": "35 phút",
        "tag": "Gia đình",
        "rating": 4.9,
        "reviews": 275,
        "category": "Lẩu",
        "origin": "Hà Nội",
        "calories": "650 kcal",
        "ingredients": "Cua, đậu phụ, cà chua, rau sống, bún",
        "nutritional_info": {
            "calories": 650,
            "protein": 30,
            "carbs": 58,
            "fat": 24
        }
    },
    {
        "name": "Bánh Canh Cua",
        "price": 50000,
        "image": "/assets/images/food/cao-lau.jpg",
        "description": "Sợi bánh canh dai, nước cua sền sệt, chả cá",
        "full_description": "Bánh canh cua với nước dùng sền sệt ngọt từ cua, sợi bánh canh dai mềm, chả cá và thịt cua tươi. Món ăn đậm đà, no bụng, rất được ưa chuộng ở miền Nam.",
        "time": "16 phút",
        "tag": "No bụng",
        "rating": 4.7,
        "reviews": 193,
        "category": "Bún/Phở",
        "origin": "Sài Gòn",
        "calories": "540 kcal",
        "ingredients": "Bánh canh, cua, chả cá, hành ngò",
        "nutritional_info": {
            "calories": 540,
            "protein": 26,
            "carbs": 60,
            "fat": 16
        }
    }
]

def populate_meals():
    for meal_data in meals_data:
        meal, created = Meal.objects.get_or_create(
            name=meal_data['name'],
            defaults=meal_data
        )
        if created:
            print(f"Created meal: {meal.name}")
        else:
            print(f"Meal already exists: {meal.name}")

if __name__ == '__main__':
    populate_meals()
    print("Database populated successfully!")
