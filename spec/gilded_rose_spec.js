// describe("Gilded Rose", function() {

//   it("should do something", function() {
//     update_quality();
//   });
// });
var items = []

beforeEach(()=> {
  items = []
  items.push(new Item('+5 Dexterity Vest', 10, 20));
  items.push(new Item('Aged Brie', 2, 0));
  items.push(new Item('Elixir of the Mongoose', 5, 7));
  items.push(new Item('Sulfuras, Hand of Ragnaros', 0, 80));
  items.push(new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20));
  items.push(new Item('Conjured Mana Cake', 3, 6));
})

describe('sulfuras', function() {

  it('sulfuras should never change', function() {
    let sulf = {}
    for (let key of items) {
      if (key.name === 'Sulfuras, Hand of Ragnaros') {
        sulf = key
      }
    }

    let qual = sulf.quality
    let sellBy = sulf.sell_in

    update_quality(items);
    
    expect(qual).toBe(sulf.quality);
    expect(sellBy).toBe(sulf.sell_in);
  });

});


describe('aged brie', function() {

  it('aged brie quality should increase no matter sell by', function() {
    let brie = {}
    for (let key of items) {
      if (key.name === 'Aged Brie') {
        brie = key
      }
    }

    let qual = brie.quality;
    let sellBy = brie.sell_in;
    update_quality(items)

    expect(brie.quality).toBe(Number(qual+1))
    expect(brie.sell_in).toBe(Number(sellBy-1))
  });
})

describe('normal items', function() {

  it('normal items should decrement by one in quality if sell_in is positive',function() {
    let vest = {}
    let potion = {}
    for (let key of items) {
      if (key.name === 'Elixir of the Mongoose') {
        potion = key
      } else if (key.name === '+5 Dexterity Vest') {
        vest = key
      }
    };

    vestQual = vest.quality;
    vestSellBy = vest.sell_in;

    potionQual = potion.quality;
    potionSellBy = potion.sell_in;

    update_quality(items);

    expect(vest.quality).toBe(Number(vestQual-1));
    expect(vest.sell_in).toBe(Number(vestSellBy-1));
    expect(potion.quality).toBe(Number(potionQual-1));
    expect(potion.sell_in).toBe(Number(potionSellBy-1));

  });

  it('normal items should decrement by 2 in quality if sell_in is 0 or less', function() {
    let vest = {}
    let potion = {}
    for (let key of items) {
      if (key.name === 'Elixir of the Mongoose') {
        potion = key
      } else if (key.name === '+5 Dexterity Vest') {
        vest = key
      }
    };
    vest.sell_in = -1;
    potion.sell_in = -1;

    vestQual = vest.quality;
    vestSellBy = vest.sell_in;

    potionQual = potion.quality;
    potionSellBy = potion.sell_in;

    update_quality(items);
    expect(vest.quality).toBe(Number(vestQual-2));
    expect(vest.sell_in).toBe(Number(vestSellBy-1));
    expect(potion.quality).toBe(Number(potionQual-2));
    expect(potion.sell_in).toBe(Number(potionSellBy-1));


  })
})

describe("Conjured", function() {
  it("Conjured should decrement twice as fast", function () {
    let conjured = {};
    for(let key of items) {
      if(key.name.includes("onjured")) conjured = key
    }

    const sellBy = conjured.sell_in;
    const qual = conjured.quality;

    update_quality(items);

    if (qual === 0) {
      expect(qual).toBe(conjured.quality);
    } else {
      expect(qual).toBe(conjured.quality + 2);
    }
    expect(sellBy).toBe(conjured.sell_in + 1);
  });
});