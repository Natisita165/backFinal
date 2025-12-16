const { Router } = require('express');
const RoleController = require('../controller/role.controller');
const RoleService = require('../../application/use-cases/role.service');
const RoleMongoRepository = require('../../infrastructure/repositories/database/mongo/role.mongo.repository');
const asyncHandler = require('../utils/async.handler');
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { isAdmin } from '../middlewares/admin.middleware.js';
import { createRoleController } from '../controllers/role.controller.js';

const roleRepository = new RoleMongoRepository();
const roleService = new RoleService(roleRepository);
const roleController = new RoleController(roleService);

const router = Router();
router.get('/', asyncHandler(roleController.getAll));
router.get('/:id', asyncHandler(roleController.getById));
router.post('/', asyncHandler(roleController.create));
router.put('/:id', asyncHandler(roleController.update));
router.delete('/:id', asyncHandler(roleController.delete));
router.post('/', authMiddleware, isAdmin, createRoleController);

module.exports = router;
