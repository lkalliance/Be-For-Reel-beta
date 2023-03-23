const { Post } = require('../models');

const postdata = [
  {
    title: 'My first post',
    content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci eius atque exercitationem. Rerum impedit aut, quas perspiciatis unde non eius quam a saepe perferendis error eum? Cumque in, inventore quas expedita ipsa obcaecati sed quaerat porro odio doloremque accusamus.

    Reiciendis neque inventore rem mollitia similique ducimus corrupti, quia quis vitae enim voluptatibus fugit earum atque commodi, explicabo natus, dolorum impedit maxime. Nihil deleniti maxime tenetur facere error dolor. Esse dolor ipsam ducimus quia rem ad, veritatis quam corrupti, praesentium ratione ullam officia itaque facilis non. Laborum necessitatibus mollitia porro consectetur id aspernatur.
    
    Ex consectetur recusandae non ipsum est quos quam, inventore quia sequi perspiciatis dolore commodi ullam, fugiat doloribus ab nihil totam cumque aliquam eos possimus odio consequuntur magni nobis! Quos dolor exercitationem ex vero, et harum eligendi nobis eum cupiditate! Corporis eius, soluta similique suscipit ullam laudantium vero ea? A amet placeat aliquid cumque laborum mollitia ducimus ea explicabo.`,
    user_id: 1,
  },
  {
    title: 'My second post',
    content: `Here we go a second time! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Exercitationem vero rem earum saepe impedit natus blanditiis debitis laudantium quos perspiciatis laborum ea autem consectetur, ipsum vitae hic possimus aspernatur accusantium quidem culpa maxime.

    Repellat iure blanditiis quasi atque illo. Nam, fugit magni. Voluptas vitae totam aliquid velit cum natus iste odio! Eius voluptatum, consectetur expedita ullam asperiores perferendis culpa illo? Nisi laudantium earum, fugiat qui natus ipsa sequi vel, quaerat vitae libero temporibus delectus esse beatae quae.
    
    A repellendus consequatur aliquid recusandae nisi quo quae porro, itaque maiores blanditiis voluptate soluta perferendis ab voluptates delectus. Quidem, distinctio sed corrupti quibusdam voluptas ipsam nemo numquam porro, nulla pariatur quam delectus veniam sapiente reiciendis quis eos expedita rem autem? Architecto accusantium nisi fugit accusamus ipsa tenetur corrupti magni officiis, qui veniam vel nostrum suscipit. Officiis excepturi saepe vitae pariatur explicabo odit iure veritatis qui, ratione aspernatur molestiae fugiat eaque suscipit, similique eos. At culpa quae rerum, pariatur provident aut animi deleniti modi facilis quaerat eius nemo. Maxime soluta dolores maiores expedita magnam facere quidem necessitatibus rerum, rem amet reprehenderit voluptatem possimus est atque suscipit. Adipisci labore nulla dolorem tenetur quas suscipit nesciunt ab recusandae?
    
    Officia, culpa iusto? Reprehenderit, facilis, necessitatibus id autem inventore voluptatem fuga excepturi in ipsa molestias non est quisquam natus, minima quis tempore? Nulla voluptas debitis tempore maiores dolore ipsum quis, eaque porro vero alias iste provident adipisci ipsa, quidem sapiente optio ullam error reprehenderit doloremque earum rerum sit asperiores? Perferendis corrupti et, nulla quis minus perspiciatis optio omnis.`,
    user_id: '1',
  },
  {
    title: 'First post for User Two',
    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci tempore quos recusandae consectetur, quisquam voluptas, doloremque doloribus delectus, commodi odit neque. Enim veritatis iusto culpa nobis amet earum aperiam obcaecati fugit impedit? Quod fugiat at dolor modi quo iure architecto earum repudiandae est ipsum dicta repellat, recusandae eum rerum nihil.`,
    user_id: '2',
  },
  {
    title: 'First post for User Four',
    content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae odio consequuntur explicabo porro reprehenderit ullam eveniet nostrum, doloribus neque sit nesciunt rerum aut dolorem dolorum vitae iusto beatae pariatur sequi, sed quidem, ipsa illo excepturi ex? Provident quia eos, nemo non, iusto earum nobis voluptates, aliquam quam alias consequuntur neque aspernatur optio? Excepturi distinctio voluptates mollitia. Neque impedit voluptas harum porro sequi vitae nobis est corrupti possimus modi maxime ullam, animi earum repudiandae dolores iure perferendis ut velit at officiis!

    Necessitatibus provident tenetur dolor veritatis eligendi assumenda sapiente perspiciatis eveniet quaerat, suscipit ex ad rerum, corrupti explicabo. Harum soluta qui deleniti labore sint. Esse qui eius nesciunt reprehenderit optio nostrum, beatae doloremque consectetur ipsam, odio illum libero ducimus. Quidem vitae quaerat ipsum quo, fugit, laboriosam consectetur libero eum minima error tenetur accusamus enim accusantium qui voluptate quibusdam, commodi ab excepturi quasi reiciendis corrupti?
    
    Consequatur ipsa laudantium perspiciatis nam, rem voluptatibus modi accusantium odit dolore! Iusto voluptates tempora eveniet sit? Dolores nemo deserunt cupiditate officiis atque! Beatae animi quod laudantium reiciendis atque adipisci illum commodi dicta saepe asperiores earum libero, aliquam excepturi in maxime quidem, distinctio explicabo.
    
    Totam rerum maiores delectus pariatur quos, ex est temporibus sapiente similique dolores et ratione explicabo, cumque officia nesciunt blanditiis labore nulla? Dolore dicta, cum aliquam voluptas minima in consequatur, doloribus quos aspernatur eius corrupti quibusdam, voluptates deleniti magnam mollitia debitis dignissimos veritatis fugiat incidunt neque? Unde error alias rerum rem, pariatur quo atque accusantium fugit veniam magnam eos illo, ducimus cum repudiandae cupiditate mollitia voluptas facere non eius optio ab maiores similique? Tempora repellat excepturi, explicabo molestiae tenetur odio numquam corrupti dolorum facilis. Labore iusto omnis nulla quas odit quod! At repellendus atque rem dolore nihil cumque quibusdam distinctio ea eaque magni dicta earum sapiente eos vel, voluptatibus, et blanditiis id dolores? Repellat, omnis!`,
    user_id: '4',
  },
  {
    title: 'Third post for User One',
    content: `This looks a lot like the other ones. Doesn't anyone have anything unique to say? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem, et? Accusamus perspiciatis quod molestiae? Quo expedita sit, ab natus labore dolorum sint nemo dignissimos dolore explicabo. Facilis nam sequi magnam asperiores perferendis possimus neque, unde necessitatibus, excepturi dolorum praesentium porro facere error consequatur quod deleniti dignissimos dolor earum, a voluptates.`,
    user_id: '1',
  },
  {
    title: 'And now a Limerick',
    content: `There once was a man from lor ipsum,
    Whose socks were both made out of gypsum.
    When running a race,
    He fell on his face,
    And something that rhymes too with gypsum.`,
    user_id: '2',
  },
  {
    title: 'User One likes to type',
    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, vitae laboriosam in voluptatum minus corrupti distinctio quidem ipsam quae numquam soluta, eligendi exercitationem ipsum, ratione rerum iure animi nisi molestiae. Tempora expedita delectus aut recusandae vel corporis quo esse cum ea itaque voluptate deleniti magnam quis repellendus, placeat dolore? Eligendi, quod? Placeat nam dolorem eum ut aperiam est illo nihil. Placeat obcaecati officia aspernatur vero quaerat vel, autem voluptates omnis libero nulla unde voluptatum optio tempore perspiciatis! Ullam mollitia beatae laboriosam consectetur facilis dolorem, molestiae fugiat voluptas.
    
    Obcaecati minima sed quisquam, aliquam perspiciatis quas assumenda facere. Quo sapiente eos quos voluptatibus minus ea aperiam, praesentium reiciendis impedit hic debitis voluptate repellat porro ducimus voluptatem exercitationem sed beatae, quam esse vel natus quis dicta. Quaerat sapiente eos dolor dignissimos fugiat dolore error asperiores, ipsam iusto, placeat, veritatis maxime non at dolorum. Pariatur molestiae unde nobis at aliquam sequi necessitatibus hic perspiciatis voluptatem esse fuga impedit quae culpa quasi, praesentium, ipsam quibusdam eaque alias facere dignissimos, nemo eius. In nostrum ex natus, nulla deserunt nisi magnam voluptatum dignissimos dicta! Beatae, voluptatem voluptas sequi ea nostrum ut soluta inventore quod dicta error pariatur modi! Soluta, libero corporis nisi a consequatur modi dolores qui eaque, minus atque odit ea vel minima ullam quas suscipit reprehenderit optio? Architecto, accusantium. Itaque provident fuga tenetur blanditiis, nisi numquam a natus. Exercitationem illum debitis alias? Repudiandae similique accusantium, iusto debitis explicabo officia quibusdam molestias voluptatem in libero porro dicta eligendi quod dolore facilis voluptatum architecto fuga obcaecati ex quo beatae cum voluptate a. Officiis quis reprehenderit exercitationem voluptate nesciunt doloribus sed nemo quidem ipsum. Sit hic, tenetur ducimus impedit rerum minus, officiis aut odit quisquam alias quibusdam atque repudiandae dignissimos illum excepturi modi cupiditate repellendus voluptates suscipit natus in? Facere sequi voluptatibus provident consectetur aliquid animi excepturi accusamus, ab tempore enim nisi dolor explicabo vitae optio alias, deserunt vero debitis nobis incidunt quidem non, ad facilis placeat? Dolorum blanditiis dolor id omnis, minima, eos sint tenetur cupiditate reiciendis assumenda distinctio asperiores, nesciunt voluptatum doloremque consequuntur corrupti hic aliquam eum expedita eveniet molestiae laborum dolore tempore. Libero fugit, cupiditate, non eligendi adipisci doloremque maiores molestias quia fuga dolorum amet molestiae odit illo? Quibusdam ratione qui molestias dolores, voluptatem explicabo recusandae, quisquam repellat nesciunt labore laudantium aliquam tenetur sint natus doloremque necessitatibus vitae distinctio! Expedita, accusamus? Laboriosam optio fuga eos rerum ratione, exercitationem facilis eum culpa autem necessitatibus facere ducimus? Voluptatibus illo libero, inventore praesentium a quaerat ipsum quia molestiae similique illum quam laborum pariatur unde veritatis numquam facilis ea voluptatem consectetur, ratione tempore perferendis. Doloremque dolor quam iusto aspernatur! Eligendi, sed nulla ut illo repellendus iure voluptates accusantium dolorem odio quod ab consectetur tempore minima error eius fuga. In molestias laudantium illum pariatur unde ipsa odio eum eveniet optio eos deleniti iure ad officia, hic ea labore? Blanditiis impedit reprehenderit hic! Totam ab tenetur alias consectetur adipisci odio possimus quibusdam ut voluptatum tempora, incidunt nostrum accusamus, beatae ipsa quaerat voluptatem perspiciatis sequi maiores laboriosam? Tempore corporis atque minus repellat quo aliquam sed? Suscipit reprehenderit minus id est, commodi earum consectetur incidunt sunt ratione autem facilis exercitationem fuga tempore asperiores officiis, ex ut dignissimos illo unde repellat vitae quas?
    
    Iusto consequuntur neque cumque laborum exercitationem officia harum excepturi modi.`,
    user_id: '1',
  },
  {
    title: 'User Five testing the system',
    content: 'Hello? Is anyone there?',
    user_id: '5',
  },
];

const seedPost = () => Post.bulkCreate(postdata);

module.exports = seedPost;
