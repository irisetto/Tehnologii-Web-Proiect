INSERT INTO animals(animal_class, common_name, scientific_name, habitat, lifestyle, diet, weight, height, region, lifespan, skin_type, about_text) 
VALUES 
('Mammal', 'Elephant', 'Elephas maximus', 'Grasslands', 'Diurnal', 'Herbivore', 6000, 3.3, 'Africa', 70, 'Thick Skin', 'The elephant is the largest terrestrial mammal.'),

('Bird', 'Sparrow', 'Passer domesticus', 'Urban Areas', 'Diurnal', 'Omnivore', 0.03, 0.16, 'Worldwide', 3, 'Feathers', 'Sparrows are small and plump bird.'),

('Reptile', 'Green Anole', 'Anolis carolinensis', 'Forests', 'Diurnal', 'Insectivore', 0.005, 0.2, 'North America', 5, 'Scales', 'Green anoles are common lizards in the southeastern United States.'),

('Fish', 'Clownfish', 'Amphiprioninae', 'Coral Reefs', 'Diurnal', 'Omnivore', 0.25, 0.11, 'Pacific Ocean', 6, 'Scales', 'Clownfish are known for their symbiotic relationship with sea anemones.'),

('Amphibian', 'Red-eyed Tree Frog', 'Agalychnis callidryas', 'Rainforest', 'Nocturnal', 'Carnivore', 0.015, 0.075, 'Central America', 5, 'Smooth Skin', 'Red-eyed tree frogs are known for their vibrant colors.'),

('Mammal', 'Giant Panda', 'Ailuropoda melanoleuca', 'Mountainous Forests', 'Diurnal', 'Herbivore', 100, 1.5, 'China', 20, 'Fur', 'Giant Pandas are famous for their love of bamboo.'),

('Bird', 'Emperor Penguin', 'Aptenodytes forsteri', 'Antarctic', 'Diurnal', 'Carnivore', 23, 1.2, 'Antarctica', 20, 'Feathers', 'Emperor Penguins are the tallest and heaviest species of penguin.'),

('Reptile', 'Leatherback Sea Turtle', 'Dermochelys coriacea', 'Oceans', 'Nocturnal', 'Carnivore', 600, 2.2, 'Global', 45, 'Leathery Skin', 'Leatherback Sea Turtles are the largest species of turtle.'),

('Fish', 'Great White Shark', 'Carcharodon carcharias', 'Oceans', 'Diurnal', 'Carnivore', 1100, 4.5, 'Global', 70, 'Rough Skin', 'Great White Sharks are known for their size and are frequently portrayed in popular culture.'),

('Amphibian', 'Axolotl', 'Ambystoma mexicanum', 'Freshwater Lakes', 'Nocturnal', 'Carnivore', 0.3, 0.3, 'Mexico', 15, 'Smooth Skin', 'Axolotls are known for their remarkable regenerative abilities.');

UPDATE animals
SET
  about_text = 'The elephant is the largest terrestrial mammal. It has a long trunk, which is used for various tasks such as gathering food, drinking water, and communication. Elephants are known for their strong social bonds and impressive intelligence. They exhibit complex emotions and have been observed showing compassion and empathy towards other elephants and even other species. Elephants also play a crucial role in maintaining their ecosystems by creating water holes and dispersing seeds through their dung. Unfortunately, elephants face significant threats such as poaching and habitat loss, making conservation efforts vital for their survival.',
  fun_fact1 = 'Elephants can communicate with each other using infrasound, which is below the range of human hearing.',
  fun_fact2 = 'Elephants have a highly developed memory and can remember specific locations and individuals for many years.'
WHERE common_name = 'Elephant';

UPDATE animals
SET
  about_text = 'Sparrows are small and plump birds. They are known for their cheerful chirping and can be found in urban areas worldwide. Sparrows have a diverse diet and primarily feed on seeds and insects. These birds are highly adaptable and have successfully adapted to human-altered environments. They build nests in various locations, including tree cavities, buildings, and even hanging baskets. Sparrows are social birds and often gather in flocks, which provides them safety and companionship. Despite their common presence, certain sparrow species have experienced population declines in recent years, emphasizing the importance of preserving their habitats and implementing conservation measures.',
  fun_fact1 = 'Sparrows are excellent fliers and can reach speeds of up to 24 miles per hour.',
  fun_fact2 = 'Male sparrows often engage in singing competitions to establish their territory and attract mates.'
WHERE common_name = 'Sparrow';

UPDATE animals
SET
  about_text = 'Green anoles are common lizards in the southeastern United States. They are known for their ability to change color, which helps them regulate body temperature and communicate with other anoles. These lizards are agile climbers and can often be found on trees and shrubs. Green anoles are insectivores and feed on a variety of small invertebrates such as insects and spiders. During the breeding season, male green anoles engage in elaborate territorial displays to attract females. They extend their pink dewlaps and perform head-bobbing movements to establish dominance. Green anoles are fascinating creatures that contribute to the biodiversity of their ecosystems and are a delight to observe in their natural habitats.',
  fun_fact1 = 'Green anoles have a specialized adhesive pad on each toe that helps them grip surfaces and climb vertically.',
  fun_fact2 = 'Male green anoles have a pink throat fan called a dewlap, which they use to display dominance and attract mates.'
WHERE common_name = 'Green Anole';

UPDATE animals
SET
  about_text = 'Clownfish are colorful fish that inhabit coral reefs. They form a symbiotic relationship with sea anemones, where they receive protection, and the anemone benefits from the clownfish`s presence. These fish are also known for their unique ability to change sex. Clownfish have a hierarchical social structure where a dominant female and male lead the group. If the female dies, the dominant male transforms into a female to maintain the social order. Clownfish are omnivorous and feed on algae, plankton, and small invertebrates. These fascinating fish not only add vibrant colors to the coral reef ecosystem but also play a crucial role in its balance and health.',
  fun_fact1 = 'Clownfish are immune to the poisonous tentacles of sea anemones, which provide them a safe place to hide.',
  fun_fact2 = 'In a clownfish group, when the dominant female dies, the dominant male transforms into a female to maintain the social structure.'
WHERE common_name = 'Clownfish';

UPDATE animals
SET
  about_text = 'Red-eyed tree frogs are known for their vibrant colors and large red eyes. They are native to the rainforests of Central America. These frogs have sticky pads on their toes, allowing them to climb trees and leaves with ease. Red-eyed tree frogs are primarily nocturnal and become active at night, hunting for insects and other small prey. During the breeding season, males call out to attract females with their unique chorus of high-pitched vocalizations. The females lay their eggs on leaves above water bodies, and when the tadpoles hatch, they drop into the water below. Red-eyed tree frogs are remarkable amphibians that showcase the incredible diversity and beauty of tropical rainforest ecosystems.',
  fun_fact1 = 'Red-eyed tree frogs have a unique defense mechanism. When threatened, they can suddenly open their eyes and reveal their bright red color, startling predators.',
  fun_fact2 = 'These frogs lay their eggs on leaves that overhang water, and when the tadpoles hatch, they drop into the water below.'
WHERE common_name = 'Red-eyed Tree Frog';

UPDATE animals
SET
  about_text = 'Giant Pandas are famous for their love of bamboo. They are native to the mountainous forests of China. These large bears have a unique diet consisting almost entirely of bamboo shoots, leaves, and stems. Giant pandas have a specialized thumb-like bone called the pseudothumb, which helps them grasp bamboo and strip its leaves. They spend most of their time feeding and can consume large quantities of bamboo each day. Giant pandas are solitary animals and have a slow reproductive rate. They are classified as endangered, primarily due to habitat loss and human activities. Conservation efforts have been successful in protecting these iconic bears, but continued conservation measures are essential to ensure their long-term survival.',
  fun_fact1 = 'Giant pandas have a specialized wrist bone called the "pseudo thumb" that helps them grasp bamboo stalks.',
  fun_fact2 = 'Despite their large size, giant pandas have a relatively low metabolic rate, which allows them to conserve energy.'
WHERE common_name = 'Giant Panda';

UPDATE animals
SET
  about_text = 'Emperor Penguins are the tallest and heaviest species of penguin. They inhabit the Antarctic region and are adapted to withstand extremely cold temperatures. These penguins have a unique breeding behavior, where the males incubate the eggs while the females hunt for food. Emperor penguins form large colonies during the breeding season, providing them with warmth and protection against the harsh environment. These remarkable birds can dive to great depths in search of fish and other marine creatures. Despite their resilience, emperor penguins are vulnerable to climate change and alterations in their Antarctic habitat. Conservation efforts aim to safeguard their breeding grounds and ensure their survival in the face of ongoing environmental challenges.',
  fun_fact1 = 'Emperor Penguins can dive to depths of over 500 meters (1,640 feet) to search for food.',
  fun_fact2 = 'To survive the harsh Antarctic winter, emperor penguins huddle together in large groups to conserve heat.'
WHERE common_name = 'Emperor Penguin';

UPDATE animals
SET
  about_text = 'Leatherback Sea Turtles are the largest species of turtle. They have a unique leathery shell and are known for their long migrations across oceans. These turtles primarily feed on jellyfish, playing an important role in maintaining marine ecosystems. Leatherback sea turtles are exceptional divers and can reach impressive depths in search of food. They have specialized adaptations, such as a streamlined body and powerful front flippers, which enable them to navigate through water efficiently. Despite their remarkable abilities, leatherback sea turtles face numerous threats, including pollution, habitat degradation, and accidental capture in fishing gear. Conservation efforts focus on reducing these impacts and protecting nesting beaches to secure the future of these magnificent creatures.',
  fun_fact1 = 'Leatherback Sea Turtles have been recorded traveling distances of over 10,000 miles (16,000 kilometers) during their migrations.',
  fun_fact2 = 'Unlike other sea turtles, leatherbacks can maintain their body temperature higher than the surrounding water, allowing them to explore colder regions.'
WHERE common_name = 'Leatherback Sea Turtle';

UPDATE animals
SET
  about_text = 'Great White Sharks are known for their size and are frequently portrayed in popular culture. They are powerful predators found in oceans worldwide. These sharks have a streamlined body, powerful jaws, and sharp teeth, making them efficient hunters. Great white sharks are apex predators, playing a crucial role in maintaining the balance of marine ecosystems. They have a keen sense of smell and can detect the scent of prey from miles away. Contrary to their portrayal in movies, great white sharks rarely pose a threat to humans and are more at risk from human activities. Conservation efforts focus on understanding their behavior, reducing accidental bycatch, and promoting responsible shark tourism.',
  fun_fact1 = 'Great White Sharks can detect the electromagnetic fields generated by other animals, helping them locate prey from a distance.',
  fun_fact2 = 'These sharks have multiple rows of teeth, and if one tooth is lost, a new one will grow in its place.'
WHERE common_name = 'Great White Shark';

UPDATE animals
SET
  about_text = 'Axolotls are unique amphibians native to freshwater lakes in Mexico. They have a fascinating ability to regenerate entire limbs, spinal cord, and even parts of their heart and brain. Axolotls are neotenic, which means they retain their juvenile characteristics throughout their lives, including gills, which allow them to breathe underwater. These amphibians primarily feed on small invertebrates such as insects, worms, and crustaceans. Axolotls have become popular pets due to their interesting appearance and regenerative capabilities. Unfortunately, axolotls are critically endangered in the wild, primarily due to habitat loss and pollution. Conservation efforts focus on preserving their natural habitats and captive breeding programs to ensure their survival.',
  fun_fact1 = 'Axolotls can breathe through their skin, which makes them especially susceptible to water pollution.',
  fun_fact2 = 'In their natural habitat, axolotls are critically endangered due to habitat loss and the introduction of non-native species.'
WHERE common_name = 'Axolotl';

UPDATE animals
SET animal_status = 'endangered'
WHERE common_name IN ('Elephant', 'Clownfish', 'Giant Panda', 'Emperor Penguin', 'Leatherback Sea Turtle', 'Great White Shark', 'Axolotl');
