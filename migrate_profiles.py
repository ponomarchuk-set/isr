import json
import random

FILE_PATH = r"c:\Users\sergi\Documents\SET\Web\site\wiki\profiles.json"

def migrate():
    try:
        with open(FILE_PATH, 'r', encoding='utf-8') as f:
            profiles = json.load(f)

        for p in profiles:
            if "expertise_data" in p and "resources" in p["expertise_data"]:
                resources = p["expertise_data"]["resources"]
                new_resources = []
                for r in resources:
                    # check if already migrated
                    if isinstance(r, dict):
                        new_resources.append(r)
                    else:
                        # assign random weight 1-10 for demo purposes
                        # rare items get higher weight? or random?
                        # user said "rarity" - let's simulate rarity
                        weight = random.randint(1, 10)
                        new_resources.append({"name": r, "weight": weight})
                
                p["expertise_data"]["resources"] = new_resources

        with open(FILE_PATH, 'w', encoding='utf-8') as f:
            json.dump(profiles, f, indent=4)
        
        print("Migration successful.")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    migrate()
