const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.getAll = (Model) =>
    catchAsync(async (req, res, next) => {
        const data = await Model.find();
        res.status(200).json({
            status: 'success',
            result: data.length,
            data: {
                data,
            },
        });
    });

exports.getOne = (Model) =>
    catchAsync(async (req, res, next) => {
        const data = await Model.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            result: data.length,
            data: {
                data,
            },
        });
    });

exports.createOne = (Model) =>
    catchAsync(async (req, res, next) => {
        const data = await Model.create(req.body);
        res.status(200).json({
            status: 'success',
            result: data.length,
            data: {
                data,
            },
        });
    });

exports.updateOne = (Model) =>
    catchAsync(async (req, res, next) => {
        const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status: 'success',
            data: {
                data: doc,
            },
        });
    });

exports.deleteOne = (Model) =>
    catchAsync(async (req, res, next) => {
        const doc = await Model.findByIdAndDelete(req.params.id);
        if (!doc) {
            return next(new AppError('No document found with this id', 404));
        }
        res.status(204).json({
            status: 'success',
            data: null,
        });
    });
