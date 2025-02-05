import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // ... you will write your Prisma Client queries here
  await  prisma.user.create({
    data: {
        email : "OuKXn@example.com",
        name : "sdd"
    }
  })

  // get user with post
  const user = await prisma.user.findUnique({
    where : {
        id : 1
    },
    include : {
        posts : true
    }
  })
  console.log(user)

  // create post
  const post = await prisma.post.create({
    data : {
        title : "sdd",
        content : "sdd",
        published : false,
        // author : {
        //     connect : {
        //         email : "OuKXn@example.com"
        //     }
        // }
        authorId : 1
    }
  })
  console.log(post)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })