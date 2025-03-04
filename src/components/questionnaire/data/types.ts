
import React from 'react';
import { QuestionType } from '../QuestionnaireContext';
import {
  House, Search, Bed, Bath, ParkingCircle, Trees, Shield, Zap, CloudSun, Wifi, 
  MapPin, Coins, Users, CalendarDays, Building, Mountain, Car, Target, 
  DollarSign, Droplets, School, ShoppingBag, Utensils, Hammer, Camera, Ruler, 
  ScrollText, HomeIcon, BadgeDollarSign, Banknote, Home, LineChart, Clock, 
  Scale, CreditCard, Presentation, FileCheck, FilePen, Construction, UserCircle, 
  Cog, Clipboard, Key, Star, ThumbsUp
} from 'lucide-react';

// Helper function to create icon elements
export const createIcon = (Icon: any) => React.createElement(Icon, { className: "h-6 w-6" });

// Export all icons for use in other files
export const icons = {
  House: createIcon(House),
  Bed: createIcon(Bed),
  Bath: createIcon(Bath),
  ParkingCircle: createIcon(ParkingCircle),
  Trees: createIcon(Trees),
  Shield: createIcon(Shield),
  Zap: createIcon(Zap),
  CloudSun: createIcon(CloudSun),
  Wifi: createIcon(Wifi),
  MapPin: createIcon(MapPin),
  Coins: createIcon(Coins),
  Users: createIcon(Users),
  CalendarDays: createIcon(CalendarDays),
  Building: createIcon(Building),
  Mountain: createIcon(Mountain),
  Target: createIcon(Target),
  DollarSign: createIcon(DollarSign),
  Droplets: createIcon(Droplets),
  School: createIcon(School),
  ShoppingBag: createIcon(ShoppingBag),
  Utensils: createIcon(Utensils),
  Hammer: createIcon(Hammer),
  Camera: createIcon(Camera),
  Ruler: createIcon(Ruler),
  ScrollText: createIcon(ScrollText),
  HomeIcon: createIcon(HomeIcon),
  BadgeDollarSign: createIcon(BadgeDollarSign),
  Banknote: createIcon(Banknote),
  Home: createIcon(Home),
  LineChart: createIcon(LineChart),
  Clock: createIcon(Clock),
  Scale: createIcon(Scale),
  CreditCard: createIcon(CreditCard),
  Construction: createIcon(Construction),
  UserCircle: createIcon(UserCircle),
  Cog: createIcon(Cog),
  Clipboard: createIcon(Clipboard),
  Key: createIcon(Key),
  Star: createIcon(Star),
  ThumbsUp: createIcon(ThumbsUp),
  FileCheck: createIcon(FileCheck),
  FilePen: createIcon(FilePen),
};
