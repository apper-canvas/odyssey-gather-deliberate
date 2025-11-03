import mockRegistrations from "@/services/mockData/registrations.json";

class RegistrationService {
  constructor() {
    this.registrations = [...mockRegistrations];
    this.nextId = Math.max(...this.registrations.map(reg => reg.Id)) + 1;
  }

  async delay() {
    return new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 100));
  }

  async getAll() {
    await this.delay();
    return [...this.registrations];
  }

  async getById(id) {
    await this.delay();
    const registration = this.registrations.find(reg => reg.Id === id);
    if (!registration) {
      throw new Error("Registration not found");
    }
    return { ...registration };
  }

  async create(registrationData) {
    await this.delay();
    const newRegistration = {
      ...registrationData,
      Id: this.nextId++,
      registeredAt: new Date().toISOString()
    };
    this.registrations.push(newRegistration);
    return { ...newRegistration };
  }

  async update(id, registrationData) {
    await this.delay();
    const index = this.registrations.findIndex(reg => reg.Id === id);
    if (index === -1) {
      throw new Error("Registration not found");
    }
    
    this.registrations[index] = {
      ...this.registrations[index],
      ...registrationData
    };
    
    return { ...this.registrations[index] };
  }

  async delete(id) {
    await this.delay();
    const index = this.registrations.findIndex(reg => reg.Id === id);
    if (index === -1) {
      throw new Error("Registration not found");
    }
    
    this.registrations.splice(index, 1);
    return { success: true };
  }

  async getByEventId(eventId) {
    await this.delay();
    return this.registrations.filter(reg => reg.eventId === eventId);
  }

  async getByUserId(userId) {
    await this.delay();
    return this.registrations.filter(reg => reg.userId === userId);
  }
}

export const registrationService = new RegistrationService();