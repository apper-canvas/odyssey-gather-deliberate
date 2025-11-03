import mockRegistrations from "@/services/mockData/registrations.json";

class RegistrationService {
  constructor() {
this.registrations = [...mockRegistrations];
    this.nextId = Math.max(...this.registrations.map(reg => reg.Id)) + 1;
  }

  async getRegistrationCountForEvent(eventId) {
    await this.delay();
    return this.registrations.filter(reg => reg.eventId === eventId && reg.status === "confirmed").length;
  }

  async getWaitlistCountForEvent(eventId) {
    await this.delay();
    return this.registrations.filter(reg => reg.eventId === eventId && reg.status === "waitlist").length;
  }

  async getWaitlistPositionForUser(eventId, userId) {
    await this.delay();
    const waitlistRegistrations = this.registrations
      .filter(reg => reg.eventId === eventId && reg.status === "waitlist")
      .sort((a, b) => new Date(a.registeredAt) - new Date(b.registeredAt));
    
    const userRegistration = waitlistRegistrations.find(reg => reg.userId === userId);
    return userRegistration ? waitlistRegistrations.indexOf(userRegistration) + 1 : null;
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
    
    // Import event service to check capacity
    const { eventService } = await import('./eventService.js');
    const event = await eventService.getById(registrationData.eventId);
    const confirmedCount = await this.getRegistrationCountForEvent(registrationData.eventId);
    
    // Determine registration status based on capacity
    const status = confirmedCount >= event.capacity ? "waitlist" : "confirmed";
    
    const newRegistration = {
      ...registrationData,
      Id: this.nextId++,
      status: status,
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

  async getUserRegistrationForEvent(eventId, userId) {
    await this.delay();
    return this.registrations.find(reg => reg.eventId === eventId && reg.userId === userId);
  }
}

export const registrationService = new RegistrationService();