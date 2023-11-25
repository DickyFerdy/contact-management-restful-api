import { prismaClient } from "../src/application/database.js";
import bcrypt from "bcrypt";

const removeTestUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      username: "test",
    },
  });
}

const createTestUser = async () => {
  await prismaClient.user.create({
    data: {
      username: "test",
      password: await bcrypt.hash("rahasia", 10),
      name: "test",
      token: "test"
    }
  });
}

const getTestUser = async () => {
  return prismaClient.user.findUnique({
    where: {
      username: "test"
    }
  });
}

const removeAllTestContacts = async () => {
  await prismaClient.contact.deleteMany({
    where: {
      username: 'test'
    }
  });
}

const createTestContact = async () => {
  await prismaClient.contact.create({
    data: {
      username: 'test',
      first_name: 'test',
      last_name: 'test',
      email: 'test@mail.com',
      phone: '08123456789'
    }
  });
}

const createManyTestContact = async () => {
  for (let i = 0; i < 15; i++) {
    await prismaClient.contact.create({
      data: {
        username: `test`,
        first_name: `test ${i}`,
        last_name: `test ${i}`,
        email: `test${i}@mail.com`,
        phone: `08123456789${i}`
      }
    });
  }
}

const getTestContact = async () => {
  return prismaClient.contact.findFirst({
    where: {
      username: 'test'
    }
  });
}

const removeAllTestAddresses = async () => {
  return prismaClient.address.deleteMany({
    where: {
      contact: {
        username: 'test'
      }
    }
  });
}

const createTestAddress = async () => {
  const contact = await getTestContact();

  await prismaClient.address.create({
    data: {
      contact_id: contact.id,
      street: 'jalan test',
      city: 'kota test',
      province: 'provinsi test',
      country: 'indonesia',
      postal_code: '61256'
    }
  });
}

const getTestAddress = async () => {
  return prismaClient.address.findFirst({
    where: {
      contact: {
        username: 'test'
      }
    }
  });
}

const createManyTestAddress = async () => {
  for (let i = 0; i < 15; i++) {
    const contact = await getTestContact();

    await prismaClient.address.create({
      data: {
        contact_id: contact.id,
        street: `jalan${i}`,
        city: `kota${i}`,
        province: `provinsi${i}`,
        country: 'indonesia',
        postal_code: `61256${i}`
      }
    });
  }
}

export {
  removeTestUser,
  createTestUser,
  getTestUser,
  removeAllTestContacts,
  createTestContact,
  getTestContact,
  createManyTestContact,
  removeAllTestAddresses,
  createTestAddress,
  getTestAddress,
  createManyTestAddress
}