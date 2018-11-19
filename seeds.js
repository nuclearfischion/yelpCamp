let mongoose = require("mongoose");
let Campground = require("./models/campground");
let Comment = require("./models/comment");

//campground array
let campgroundSeed = [
    {
        name: "Salmon Creek",
        image: "https://images.unsplash.com/photo-1534187886935-1e1236e856c3?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=384a51f2b8eaff486e080f101afc8192&auto=format&fit=crop&w=635&q=80",
        description: "The perfect oases after a day on the road. Whether it’s along the way or a quick getaway, they’ve got you covered. Located near the highways and byways of North America with long Pull-thru RV Sites, they deliver convenience to the traveling camper. Pull in, ease back and take a load off."
    },
    {
        name: "Granite Hill",
        image: "https://images.unsplash.com/photo-1533518509997-eddedc7f704e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c9c1bd6b53f7d7995cce0974d8366262&auto=format&fit=crop&w=634&q=80",
        description: "Enjoy a dip in the pool, or stretch your legs with a stroll along the koi pond, waterfall and gardens. Kids can expend energy in the playground while canine companions run freely in the fenced pet area. The well-stocked store offers RV supplies. The 1,200-square-foot clubhouse/game room has seating for 50, a full kitchen and a covered outdoor patio. It's a great gathering spot for clubs and social events."
    },
    {
        name: "Mountain Goat's Rest",
        image: "https://images.unsplash.com/photo-1532376059447-80cf8d32eed9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=db1f6d2224dd3c2dc3ed23d2b9d4e6a5&auto=format&fit=crop&w=1350&q=80",
        description: "Enjoy campfires all year and have fun in the outdoor heated pool. The Kamp K9 park is 4,000 square feet - right next to the entrance to this campground's own nature trail. In July/August, enjoy berry picking or join in hula hoop contests and ice cream socials. The basketball court even has spectator seating. This campground is the perfect spot to begin your tour of covered bridges."
    },
    {
        name: "Acorn Oaks",
        image: "https://images.unsplash.com/photo-1527707240828-f7ca7d3c46a9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3a7c6d927c900d0de631511b52ce1687&auto=format&fit=crop&w=1350&q=80",
        description: "Nestled between the breathtaking San Juan Mountains and Sangre de Cristo Mountains at 7,550 feet, the San Luis Valley is your gateway to adventure. This campground is near the golden ridges of the Great Sand Dunes National Park and Preserve, where you can hike dunes up to 750 feet tall. It's also at the base of Colorado's fourth tallest mountain, 14,345-foot Blanca Peak. The campground is just minutes from the Rio Grande Scenic Railroad and the championship Cattails Golf Course. You'll also find museums, hot-spring pools, family fun at the alligator farm, spectacular trails and wildlife."
    },
    {
        name: "Glowing Embers",
        image: "https://images.unsplash.com/photo-1524856781660-e5c92f4ac62a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=952e5225634b3558eadb9d1395113d12&auto=format&fit=crop&w=1350&q=80",
        description: "Tucked among rocks and shaded by pinon pines, the campground is a few miles southeast of the small resort town of Buena Vista and a mile from the Arkansas River. Hike or bike on public land adjacent on three sides of the campground. Your hosts can arrange for a wide variety of other pursuits - such as rafting, fishing, ATVing, jeeping and soaking in hot springs - or direct you to hiking trails, ghost towns and rockhounding sites."
    },
    {
        name: "Maple Grove",
        image: "https://images.unsplash.com/photo-1517537353166-1b517b6a8b5c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=60312daa83e19da2017cb4c6a28b2210&auto=format&fit=crop&w=1350&q=80",
        description: "At this campground, play sand volleyball, basketball and horseshoes. Breakfast is served summer mornings in the Cook Shack. Enjoy this quiet and tranquil setting. WI-FI access is provided, but is extremely limited due to the lack of Bandwidth in the Arkansas River Valley. We apologize for any inconvience this may bring, but please ENJOY NATURE!!! "
    },
    {
        name: "Sparks Lake",
        image: "https://images.unsplash.com/photo-1520963959303-a5cc3bdf9260?ixlib=rb-0.3.5&s=fe79334d11dd780c3a81e5d6c52e2e6b&auto=format&fit=crop&w=701&q=80",
        description: "In its early days, Sparks Lake was a rip-roaring railroad town. Today, the University of Wyoming's Western pride shines forth in this small town surrounded by beautiful mountains. This campsite is easily accessible from I-80, and it has more than 100 full-hookup Pull-Thru RV Sites with 30/50-amp service (water restrictions in the winter - please call for details). The campground also offers cozy one- and two-room Cabins, Premium Tent Sites and a grassy tent area - all with picnic tables and charcoal grills. Other amenities include a recreation center (open late spring - fall,  weather permitting), an off-leash K9 area, a laundry room, satellite TV (in all rows) and Wi-Fi."
    },
    {
        name: "Death Valley",
        image: "https://images.unsplash.com/photo-1486915309851-b0cc1f8a0084?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=44296710cae68fa09464afdbe49e6be8&auto=format&fit=crop&w=634&q=80",
        description: "Then come to the campground's high desert setting to relax by the campfire and tell stories of the day's adventures. Days are warm, nights are cool, and the stars are crystal clear. There's no light pollution here!"
    },
    {
        name: "Timber Creek",
        image: "https://images.unsplash.com/photo-1508247489384-8a5d237ac250?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e614fa91a779151185dd42899c9639ce&auto=format&fit=crop&w=700&q=80",
        description: "Enjoy camping in quiet, shady pull-through sites nestled in a peaceful country setting. Big-Rig pull-through sites are available without interfering trees, making satellite service very accessible. We are only 2 miles from the interstate yet we enjoy both the freedom from traffic noise and the chorus of owls, mocking birds and other southern birds and migrating northern feathered friends. The lonely but distinct cry of the midnight train is always hauntingly present. Not a day passes by without a gesture of southern hospitality and charm bestowed upon visitors by our local residents."
    },
    {
        name: "Hidden Cove",
        image: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=aaf08554d638e2690a4383bf1c632d93&auto=format&fit=crop&w=649&q=80",
        description: "We are centrally located and the perfect home base for exploring Arches and Canyonlands National Parks, San Rafael Swell, Goblin Valley State Park, Little Wild Horse Canyon, Swasey's beach, Athena mountain bike trail, Moonshine Wash slot canyon, and MANY other local attractions and adventures. Enjoy up to 80-foot Pull-Thru RV Sites with lots of space between sites and our large pool with a slide."
    },
    {
        name: "Devil's Tower",
        image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d9df10d159cc11074d9a7996e8aca442&auto=format&fit=crop&w=1350&q=80",
        description: "This campsite is 1/4 mile off I-77 (only 20 minutes from uptown Charlotte) in a relaxing wooded atmosphere, free from the noise and bustle of the city."
    },
    {
        name: "Cedar Pass",
        image: "https://images.unsplash.com/photo-1517771778436-39f5763f5270?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1a13e64c2ca5f8236aebd26c4226acf2&auto=format&fit=crop&w=634&q=80",
        description: "Whether you are traveling Route 66, a snowbird following the seasons or just getting away from it all, this country campground is the perfect place to stay. The on-site Crosseyed Cricket Canoe Company can outfit you with everything needed for a canoe, kayak or raft float down the scenic Meramec River. Cricket Cafe serves southern Missouri barbecue and pizza 4 - 7 p.m. daily."
    },
    {
        name: "Willapa Bay",
        image: "https://images.unsplash.com/photo-1491295134315-76602a0b3b75?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1b56a3491eda4f91f4b4455d6aa716e5&auto=format&fit=crop&w=634&q=80",
        description: "Situated in a quiet, natural forest setting on picturesque Willapa Bay, this is just the place to leave your daily life behind -  and enjoy the tidal bay! A scenic nature trail leads from the campground right to the beach, where you'll enjoy bird-watching and beachcombing. Swim in the tidal bay, rake for delicious steamer clams (license required) and work up an appetite for the area's famous Willapa Bay oysters. You're close to lighthouses and the Pacific.  Take a ride on this KOA's three-wheel banana-peel bikes - they're a blast! Play a game of volleyball, basketball, badminton or horseshoes. Enjoy ice cream socials and family activities every weekend (Memorial Day through Labor Day). Then finish your perfect day with a beautiful sunset over the bay."
    },
    {
        name: "Hoagie Hills",
        image: "https://images.unsplash.com/photo-1524062008239-962eb6d3383d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=934a61f3ad6172d4502034ddf08ff850&auto=format&fit=crop&w=375&q=80",
        description: "Check into the cozy Deluxe Cabins or settle into a prime spot right on the river and relax. You're well-situated to search for the Ellensburg blue agate, enjoy a concert at the Gorge Amphitheatre, hike the John Wayne Pioneer Trail, or visit Roslyn, where Northern Exposure was filmed."
    },
    {
        name: "Cheesesteak Creek",
        image: "https://images.unsplash.com/photo-1511516315833-9c19f0e41bf4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=768b66c6b7354ddf24768ac457cfdc8e&auto=format&fit=crop&w=751&q=80",
        description: "This campsite is an old historic town with many antique shops, coffee houses and restaurants to pique your interest. Explore the Marine Life Center, where you can touch and interact with many of the sea creatures that are native to this area."
    }
];
let commentSeed = [
    {
        text: "Nice, I guess, but not a lasagna in sight...",
        author: "Garfield"
    },
    {
        text: "I am a smart, strong, sensual woman.",
        author: "Tina Belcher7"
    }
];

function seedDB(){
    //remove all existing campgrounds
    Campground.deleteMany({}, function(err){
        if(err)
            console.log(err);
        else{
            console.log("removed all campgrounds!");
            
            //add some campgrounds
            campgroundSeed.forEach(function(campground){
                Campground.create(campground, function(err, createdCampground){
                    if(err)
                        console.log("couldn't create seed campground");
                    else{                        
                        //add some comments after successfully creating campground
                        console.log("successfully created campground: " + createdCampground.name);
                        
                        commentSeed.forEach(function(comment){
                            Comment.create(comment, function(err, createdComment){
                                if(err)
                                    console.log("couldn't create comment :(");
                                else{
                                    //associate the createdComment with the createdCampground
                                    createdCampground.comments.push(createdComment);
                                    createdCampground.save();
                                    console.log("added comment to: " + createdCampground.name);                                
                                }
                            });
                        });
                    }
                });
            });
        }
    });
    
}

module.exports = seedDB;